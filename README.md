# <p align="center">HTML Color Explorer</p>
## What It Is?
This Web Application allows you to explore nearly all available HTML colors. At its core, HTML colors are created through the blending of three primary color components: **RED**, **GREEN**, and **BLUE**. Each of these components can have a value ranging from **0** to **256** in decimal numbers, where **0** represents the complete absence of the color and **256** indicates its maximum intensity. By varying these three components from rgb(0,0,0) to rgb(256,256,256), you can create an impressive spectrum of approximately **16,777,216** different colors. This comprehensive color system is known as the rgb color model. 

This application allows you to **adjust** color components and instantly see the **represented** color. You can modify values in three ways:
- Sliding the component sliders
- Entering numbers directly into component fields
- Selecting a named-color from the **color family grid**

The Web App provides a user-friendly environment to experiment with different color components until you achieve your desired color combination.

Beyond the three primary components, HTML colors include an additional parameter called the **alpha channel**, which controls the **opacity** of the color. This value ranges from **0** to **1** (in decimal numbers), where 0 represents full transparency and 1 indicates full opacity. The alpha parameter is optional; when omitted, it defaults to 1. You can experiment with different alpha values and observe their effects in the **display box**. When this fourth parameter is added, the format becomes known as **rgba color**. For example, rgba(128,128,128,0.5) represents a *semi-transparent gray color*.

RGB color format, while widely used in HTML, is just one of several available color formats (learn more about formats [here](https://medium.com/@abhishekjainindore24/all-about-images-and-their-formats-1bcba5c854e7)). Another popular alternative is the **HSL color format**, which defines colors using three parameters: **hue**, **saturation**, and **lightness**. For a deeper understanding of HSL, you can read more [here](https://cloudfour.com/thinks/hsl-a-color-format-for-humans/#:~:text=The%20HSL%20color%20format%20is,0%25%20to%20100%25). While converting between RGB and HSL is possible, the conversion formulas can be complex and difficult to memorize. Fortunately, this web application handles these conversions automatically. Additionally, it supports **RGB's hexadecimal** notation, which is another common way to represent colors in web development.

This web application addresses two additional features, with the first being "**named colors**." Named colors provide a way to reference specific colors using memorable words instead of technical formats like RGB, HEX, or HSL. However, the number of named colors is naturally limited, as it would be impractical to assign unique names to all 16,777,216 possible colors. Instead, names are typically given to colors commonly found in nature. These named colors can be used as alternatives to RGB or HSL values in HTML/CSS styling syntax. To explore the available named colors, users can click on a **color family name** and select individual **color grids**, which will display their corresponding RGB and HSL values.

The final aspect this web application addresses is color ratio. This includes two key concepts: **complementary colors** and **The Web Content Accessibility Guidelines (WCAG) Contrast Ratios Type AA** compliance. Complementary colors are opposite pairs on the color wheel that create the highest contrast ratio when used together. Meanwhile, WCAG contrast ratios provide guidelines for selecting foreground and background color combinations that ensure optimal readability and visual comfort for users. You can explore complementary colors in the *color box display*, which also demonstrates alpha channel effects. To experiment with WCAG contrast ratios, simply click on the suggested *background color grid*.

I hope you'll find this Web Application engaging and useful.

## How Does It Make?
This Web Application was built based on three core components:
- Python [FastHTML](https://fastht.ml/) framework
- [Bulma](https://bulma.io/) CSS framework
- Pure JavaScript

### What and Why FastHTML?
FastHTML is a modern Python framework designed for simplicity and intuitive development. While established frameworks like *Django* and *Flask* have served the Python web development community well, each has its limitations. Django's complexity and steep learning curve can be overwhelming for newcomers. While Flask's minimalist approach provides flexibility, it often requires additional frameworks and extensions to build full-featured applications. Moreover, both frameworks traditionally rely on **gunicorn**, a synchronous Web Server Gateway Interface (WSGI). This technology is gradually being superseded by more efficient Asynchronous Server Gateway Interface (ASGI) solutions like **uvicorn**.

FastHTML's innovative design eliminates the need to master complex framework technologies, bringing developers closer to natural HTML page construction. Instead of wrestling with tedious HTML syntax, developers can leverage their existing Python knowledge. This approach allows seamless integration of Python components while maintaining the familiar conceptual model of web page development.

One of FastHTML's greatest strengths is its unified approach to full-stack development. By handling both front-end and back-end operations within a single framework, it eliminates the need for multiple technology stacks. Furthermore, as Python continues to dominate the AI landscape, FastHTML projects can easily expand into artificial intelligence applications while maintaining a consistent technology stack. This convergence of web development and AI capabilities makes FastHTML a forward-thinking choice for modern web applications.

### Why Does This Application Still Need JavaScript?
While this web application can be built entirely without JavaScript (as demonstrated in my previous version using FastHTML, which you can view [here](https://github.com/lurah/HTML-Color-Explorer)), the current version incorporates JavaScript for specific reasons.

The primary motivation for using JavaScript is to handle simple front-end interactivity more efficiently within the browser. Although FastHTML can achieve similar functionality using **htmx**, this approach would increase the communication traffic between front-end and back-end components.

This implementation demonstrates how JavaScript can be seamlessly integrated with FastHTML, similar to traditional web page development. For basic interactive features, pure JavaScript is sufficient without requiring advanced frameworks. However, not all browser interactions should rely on JavaScript. When dealing with complex operations involving multiple HTML elements, calculations, and data manipulation, server-side rendering through AJAX is often more practical. This approach showcases FastHTML's Server Side Rendering (SSR) capabilities while avoiding the complexity of implementing these features on the front end.

### What is Bulma for?
FastHTML comes with **[Pico](https://picocss.com/) CSS framework** pre-integrated for styling front-end HTML pages. While Pico is known for its simplicity, it might be too basic for some projects. Fortunately, FastHTML allows us to replace Pico with other CSS frameworks, and I personally prefer **[Bulma](https://bulma.io/)** for its more comprehensive features. Both Bulma and Pico support custom CSS integration, similar to how we can include JavaScript files. These integrations are managed in the \<header\> section of our front-end HTML pages, but instead of using HTML syntax, we configure them using Python. This approach demonstrates FastHTML's intuitive and straightforward nature.

## How to Run this Web Application?
Running this web application is straightforward. You can use any Linux distribution, which typically comes with Python pre-installed and your preferred web browser. Here's how to get started:

1. First, install the FastHTML Python module using pip:

```bash    
    pip install python-fasthtml
```
2. Clone the repository:

```bash
    git clone color-w-js
```

3. Navigate to the project directory and launch the application:

```bash
    cd color-w-js
    python color.py
```

The web server will start automatically on port 8000. To access the application, open your web browser and visit: http://localhost:8000



