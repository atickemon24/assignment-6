const handler = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await response.json();
    const groupButton = document.getElementById("button-group");

    data.data.slice(0, 4).forEach((category) => {
      const div = document.createElement("div");
      div.innerHTML = `
                <a onclick="handleLoad('${category.category_id}')" class="btn">${category.category}</a>
            `;
              div.querySelector("a").addEventListener("click", (event) => {
    const categoryId = event.currentTarget.getAttribute("data-category-id");
    handleCategoryClick(categoryId);
  });
      groupButton.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const handleLoad = async (categoryId) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await response.json();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    cardContainer.innerHTML = "";

    data.data.forEach((videos) => {
      const div = document.createElement("div");
      div.innerHTML = `
            <div class="card card-compact w-[300px] h-[320px] bg-base-100 shadow-xl">
                <figure><img src=${videos.thumbnail} class="w-[300px] h-[200px]" /></figure>
                <div class="card-body">
                    <h2 class="card-title">
                    <img class="w-[50px] rounded-full h-[50px]" src=${videos.authors[0].profile_picture}/>${videos.title}</h2>
                    <p class="flex mr-2 pl-[50px]">${videos.authors[0].profile_name}
                    ${videos.authors[0].verified ? '<img  class="w-[20px] "src="./assest/verified.png" alt="Verified" class="verified-icon">' : ''}</p>
                    <span class="pl-[50px]">${videos.others.views} views</span>
                </div>
            </div>
        `;

      cardContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
document.getElementById("blogButton").addEventListener("click", () => {
  window.open("blog.html", "_blank");
});

document.getElementById('sortButton').addEventListener('click', () => {

  fetchVideoData()
    .then((data) => {

      data.sort((a, b) => b.views - a.views);

      const cardContainer = document.getElementById('card-container');

      // Clear the card container
      cardContainer.innerHTML = '';


      data.forEach((video) => {
        const card = createVideoCard(video);
        cardContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error('Error fetching video data:', error);
    });
});

function createVideoCard(video) {
  const card = document.createElement('div');
  card.classList.add('card', 'card-compact', 'w-[230px]', 'bg-base-100', 'shadow-xl');
  card.innerHTML = `
        <figure><img src="${video.thumbnail}" alt="${video.title}" class="w-[300px]" /></figure>
        <div class="card-body">
        <h2 class="card-title">${video.title}</h2>
        <p>${video.author}</p>
        <span>${video.views} views</span>
        </div>
    `;

  return card;
}


function fetchVideoData() {

  return Promise.resolve([
    {
      title: 'Midnight Serenade',
      thumbnail: "https://i.ibb.co/QPNzYVy/moonlight.jpg",
      author: 'Noah Walker',
      views: "543K",
    },
    {
      title: 'Kid Gorgeous',
      thumbnail: "https://i.ibb.co/xgWL3vQ/kid-gorgeous.jpg",
      author: 'John Mulaney',
      views: "241K",
    },
    {
      title: 'Colors of the Wind',
      thumbnail: "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
      author: 'Ethan Clark',
      views: "233K",
    },
    {
      title: 'Sticks & Stones',
      thumbnail: "https://i.ibb.co/5LRQkKF/stick-and-stones.jpg",
      author: 'Dave Chappelle',
      views: "113K",
    },
    {
      title: 'Shape of You',
      thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
      author: 'Olivia Mitchell',
      views: "110k",
    },
    {
      title: 'Enchanted Harmonies',
      thumbnail: "https://i.ibb.co/hdtZYbB/enchnting.jpg",
      author: 'Sophia Williams',
      views: "7.6K",
    },
    {
      title: 'Smells Like Teen Spirit',
      thumbnail: "https://i.ibb.co/f9FBQwz/smells.jpg",
      author: 'Oliver Harris',
      views: "5.4K ",
    },
    {
      title: '30 Rock',
      thumbnail: "https://i.ibb.co/kc8CCFs/30-rock.png",
      author: 'Tina Fey',
      views: "4.5K",
    },
    {
      title: 'Inside Amy Schumer',
      thumbnail: "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
      author: 'Amy Schumer',
      views: "3.6K",
    },
    {
      title: 'Beyond The Pale',
      thumbnail: "https://i.ibb.co/ZNggzdm/cake.jpg",
      author: 'Jim Gaffigan',
      views: "2.6K ",
    },
    {
      title: 'Laugh at My Pain',
      thumbnail: "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
      author: 'Kevin Hart',
      views: "1.1K ",
    },
    {
      title: 'Sunrise Reverie',
      thumbnail: "https://i.ibb.co/DRxB1Wm/sunris.jpg",
      author: 'Ava Johnson',
      views: "1.1K ",
    },
  ]);
}

handler();
handleLoad("1000");
