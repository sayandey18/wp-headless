import Card from '@/components/Card';

function stripTags(html) {
    return html.replace(/<[^>]*>/g, '');
}

export default function ArticleCard({ article }) {
    return (
        <Card as="article">
            <Card.Title href={article?.slug}>{article?.title}</Card.Title>
            <Card.Eyebrow as="time" dateTime={article?.date} decorate>
                {article?.date
                    ? new Date(article?.date).toDateString()
                    : 'Invalid date'}
            </Card.Eyebrow>
            <Card.Description>{stripTags(article?.excerpt)}</Card.Description>
            <Card.Cta slug={article?.slug}>Read article</Card.Cta>
        </Card>
    );
}
