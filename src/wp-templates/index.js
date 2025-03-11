import home from '@/wp-templates/home';
import page from '@/wp-templates/page';
import single from '@/wp-templates/single';
import category from '@/wp-templates/category';
import archive from '@/wp-templates/archive';
import author from '@/wp-templates/author';

const wpTemplates = {
    page: page,
    single: single,
    author: author,
    archive: archive,
    category: category,
    'page-home': home
};

export default wpTemplates;
