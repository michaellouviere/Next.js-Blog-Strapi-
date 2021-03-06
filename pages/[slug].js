import Link from 'next/link';
const marked = require("marked");

export default function Article({article}) {
	let content = article.content ? marked(article.content) : '<p></p>';
	return (
		<div>
			<Link href="/"><a>Go Home</a></Link>
			<h1>{article.title}</h1>
			<div dangerouslySetInnerHTML={{__html: content}}></div>
		</div>
	)
}

//Rell next.js how many pages there are
export async function getStaticPaths() {
	const res = await fetch('https://strapi-cms-457bx.ondigitalocean.app/articles');
	const articles = await res.json();

	const paths = articles.map((article) => ({
		params: { slug: article.slug }
	}))

	return {
		paths,
		fallback: false //setting this to true
	}
}

export async function getStaticProps({ params }) {
	const { slug } = params;
	const res = await fetch(`https://strapi-cms-457bx.ondigitalocean.app/articles?slug=${slug}`);
	const data = await res.json();
	const article = data[0];

	return {
		props: { article }
	}
}

//for each individiual page: get the data for that page