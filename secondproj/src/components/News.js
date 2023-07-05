import React, { Component } from 'react'
import NewItem from './NewItem'
import Spanner from './Spanner';
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
      }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=90cf722a77bc4037ae35592de647c4a8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    async componentDidMount(){
        this.updateNews();
    }

    handlePrevClick = async ()=>{
        this.setState({ page: this.state.page - 1},()=>{
            this.updateNews();
        });
    }
    handleNextClick = async ()=>{
        this.setState({ page: this.state.page + 1},()=>{
            this.updateNews();
        });
    }
    render() {
        // console.log('render');
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin: '40px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headline</h1>
                {this.state.loading && <Spanner />}
                <div className="row my-3">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-2" key={element.url}>
                            <NewItem title={element.title? element.title.slice(0,40):null} description={element.description? element.description.slice(0,75):null} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                    <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previour</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}

