import ArticleForm from '../../article-form';

export default function EditArticlePage({ params }: { params: { id: string } }) {
  return <ArticleForm articleId={params.id} />;
}
