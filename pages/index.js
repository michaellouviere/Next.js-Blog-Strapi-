import Link from 'next/link';
const marked = require("marked");

export default function Home({articles}) {

  return (
    <div>
      {
				articles && articles.map((article) => (
					<Link href={`/${article.slug}`} key={article.id}>
						<a>
							<h1>{article.title}</h1>
							{article?.user?.username && <div>Author: {article.user.username}</div>}
							<div dangerouslySetInnerHTML={{__html: marked(article.excerpt)}}></div>
						</a>
					</Link>
				))
			}
    </div>
  )
}

export async function getStaticProps() {
	// get posts from our api
	const res = await fetch('https://strapi-cms-457bx.ondigitalocean.app/articles');
	const articles = await res.json();

	return {
		props: { articles }
	}
}