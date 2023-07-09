import React, { useEffect, useState } from 'react'
import NewItem from './NewItem'
import Spanner from './Spanner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export default function News(props) {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;


    const capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(()=> {
        updateNews();
    }, []);

    const fetchMoreData = async ()=> {
        setPage(page + 1);
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };
    return (
        <>
            <h1 className="text-center" style={{ margin: '40px 0px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headline</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spanner />} >

                <div className="container my-3">
                    <div className="row my-3">
                        {articles.map((element) => {
                            return <div className="col-md-4 my-2" key={element.url}>
                                <NewItem
                                    title={element.title ? element.title.slice(0, 40) : null}
                                    description={element.description ? element.description.slice(0, 75) : null}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={new Date(element.publishedAt).toDateString()}
                                    source={element.source.name}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
