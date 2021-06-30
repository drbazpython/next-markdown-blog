import Posts from "../components/Posts"

export const sortByDate = (a,b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}




