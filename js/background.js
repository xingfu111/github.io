const apiUrl = 'https://mini.browser.360.cn/newtab/imgsx?tid=1&page=1&uid=0';
document.body.style.backgroundImage = "url('/img/11.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.opacity = 1; // 显示占位图

fetch(apiUrl)
    .then(response => response.json()) // 解析响应为 JSON
    .then(data => {
        // 确保数据格式正确
        if (data.code === 200 && data.data && Array.isArray(data.data.list)) {
            // 提取图片链接
            const imageUrls = data.data.list.map(item => item.img);

            // 当前背景图片索引
            let currentIndex = 0;

            // 预加载图片并设置为背景图
            function loadBackgroundImage() {
                const imageUrl = imageUrls[currentIndex];

                // 创建一个新的 Image 对象
                const img = new Image();
                img.src = imageUrl;

                // 当图片加载完成后，才更改背景
                img.onload = function () {
                    // 使用渐变过渡显示背景
                    document.body.style.backgroundImage = `url(${imageUrl})`;
                    document.body.style.opacity = 1; // 显示背景

                    // 更新索引
                    currentIndex = (currentIndex + 1) % imageUrls.length; // 如果到最后一张，循环回到第一张
                };
            }

            // 页面加载后延迟 5 秒钟开始加载背景图
            setTimeout(() => {
                // 每5秒切换一次背景图
                setInterval(loadBackgroundImage, 5000);

                // 页面加载后延迟 5 秒后立即获取初始背景图
                loadBackgroundImage();
            }, 5000);

        } else {
            console.error('API 数据格式不正确或请求失败');
        }
    })
    .catch(error => console.error('请求 API 数据时发生错误:', error));
