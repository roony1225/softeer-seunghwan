import { getCategories, getNewsByCategory } from "../../store/newsStore.js";

//category, mainTitle 이렇게 우선 접근, 동작 과정 지켜보기
// 어떻게 구현할까...
let categories = null;

export function initListContent() {
    categories = getCategories();
    return createItem(getNewsByCategory(categories[0])[0]);
}

function createItem(item) {
    const content_container = document.createElement('div');
    content_container.className = 'list-content-container';
    content_container.innerHTML = `
        <header class="list-content-header">
            <img src=${item.logo}>
            <span class="display-medium12" style="color:var(--text-default)">${item.time}</span>
            <button>
                <img src="./logos/plus.svg" style="width:12px; height:12px">
                <span class="available-medium12" style="color:var(--text-weak)">구독하기</span>
            </button>
        </header>
        <section class="list-content-body">
            <div class="list-main-news">
                <img src=${item.mainImg}>
                <span class="available-medium16" style="color:var(--text-strong)">${item.mainTitle}</span>
            </div>
            <ul class="list-related-news"></ul>
        </section>
    `;

    const ul = content_container.querySelector('.list-related-news');
    ul.appendChild(relatedArticle(item));

    return content_container;
}

function relatedArticle(item) {
    const fragment = document.createDocumentFragment();

    item.relatedArticles.forEach(e => {
        const related_article = document.createElement('li');
        related_article.className = "tab available-medium16";
        related_article.innerHTML = e.title;
        fragment.appendChild(related_article);
    })

    const foot = document.createElement('li');
    foot.className = "foot display-medium14";
    foot.innerHTML = `${item.press} 언론사에서 직접 편집한 뉴스입니다.`
    fragment.appendChild(foot);
    return fragment;
}