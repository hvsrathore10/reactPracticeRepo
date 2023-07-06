import React, { Component } from 'react'

export default class NewItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div>
                <div className="card">
                    <div style={{display: 'flex', justifyContet: 'flex-end', position: 'absolute', left: '0' }}>
                        <span className="badge rounded-pill bg-danger" style={{zIndex: 1,right:'90%'}}>{source} </span>
                    </div> 
                    <img src={!imageUrl ? "https://finbold.com/app/uploads/2023/06/Bitcoin-price-hits-1-year-high-Heres-a-buy-zone-if-correction-occurs.jpg" : imageUrl} className="card-img-top" alt="imageUrl fail" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-danger">By {!author ? "Unknown" : author} on {date}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
