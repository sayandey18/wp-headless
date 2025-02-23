import home from '@/wp-templates/home';
import page from '@/wp-templates/page';
// import contact from '@/wp-templates/contact';
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
    // 'page-contact': contact,
};

export default wpTemplates;
