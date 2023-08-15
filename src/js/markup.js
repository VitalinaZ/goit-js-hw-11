// export function createMarkUp(data, hits) {
//   totalPage = hits / 40;
  
//   const imgData = data
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `<div class="photo-card">
//   <a class="gallery__link" href="${largeImageURL}"><img src=${webformatURL} alt=${tags} loading="lazy"  width=320 height=214 /></a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes </br>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views </br>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments </br>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads </br>${downloads}</b>
//     </p>
//   </div>
// </div>`
//     )
//     .join('');

//   if (!imgData) {
//     Notify.failure(
//       `Sorry, there are no images matching your search query. Please try again.`
//     );
//     return;
//   }
//   divBox.innerHTML = imgData;
//   Notify.success(`Hooray! We found ${hits} totalHits images.`);
//   loadMoreBtnEl.classList.remove('visually-hidden');
//   lightbox.refresh();
// }

