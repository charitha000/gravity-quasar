const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'shop', component: () => import('pages/ShopPage.vue') },
      { path: 'product/:id', component: () => import('pages/ProductDetailsPage.vue') },
      { path: 'cart', component: () => import('pages/CartPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]
export default routes
