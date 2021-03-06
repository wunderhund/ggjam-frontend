import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/common'
import { prism } from '../components/common'
import { MetaData } from '../components/common/meta'

const moment = require('moment');

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const tags = data.ghostPost.tags
    const tagnumber = tags.length

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        { post.feature_image ?
                            <figure className="post-feature-image">
                                <img src={ post.feature_image } alt={ post.title } />
                            </figure> : null }
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>
                            <h6 className="date-and-reading-time">{moment(post.published_at).format("Do MMM YYYY")}</h6>
                            <h6 className="date-and-reading-time">Reading Time: {post.reading_time} minutes</h6>
                            <h6 className="date-and-reading-time">
                                {tags.map((tagItem, i) => {
                                    if (i < tagnumber - 1) {
                                        return <span><a href={"/tag/" + tagItem.slug}>{tagItem.name}</a>, </span>
                                    } else {
                                        return <span><a href={"/tag/" + tagItem.slug}>{tagItem.name}</a></span>
                                    }
                                })}
                            </h6>
                            <hr className="post-top" />
                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                            <hr className="post-bottom" />
                            <h6 className="date-and-reading-time">© 2020 {post.primary_author.name}</h6>
                            <h6 className="date-and-reading-time">First Posted: {moment(post.published_at).format("Do MMM YYYY")}</h6>
                            <h6 className="date-and-reading-time">Last Updated: {moment(post.updated_at).format("Do MMM YYYY")}</h6>
                          
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            tags: PropTypes.array,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
