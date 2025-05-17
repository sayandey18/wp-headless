import homePage from '@/wp-templates/page-home';
import postsPage from '@/wp-templates/page-posts';
import contactPage from '@/wp-templates/page-contact';
import singlePage from '@/wp-templates/single-page';
import singlePost from '@/wp-templates/single-post';
import singleProject from '@/wp-templates/single-project';
import archiveProject from '@/wp-templates/archive-project';

const templateOptions = {
    page: singlePage,
    'page-home': homePage,
    'page-posts': postsPage,
    'page-contact': contactPage,
    'single-post': singlePost,
    'single-project': singleProject,
    'archive-project': archiveProject
};

export default templateOptions;
