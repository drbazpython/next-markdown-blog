import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Post from '../components/Posts'
import {sortByDate} from '../utils'

export default function Home({ posts }) {
  
  //console.log will display in browser inspector 
  // as this function is on client
  
  return (
    <div>
      <Head>
        <title>Next Markdown Blog</title>
      </Head>

      <div className="posts">   
        {posts.map((post, index) => (
        <Post key={index} post={post} />
        ))}
      </div>

    </div>

    
  )
}


export async function getStaticProps(){
  //fetch data at build time
  // get files form posts folder
  const files = fs.readdirSync(path.join('posts'))

  //get slug and frontmatter from posts
  const posts = files.map((filename) => {

  const slug = filename.replace('.md','')

  // get frontmatter
  const markdownWithMeta = fs.readFileSync(path.join('posts',filename),'utf-8');

  //parse and destructure frontmatter with gray-matter
  const { data: frontmatter} = matter(markdownWithMeta);

  return {
    slug,
    frontmatter,
 
  }})
  
  return { props: { posts: posts.sort(sortByDate),}, }
}
