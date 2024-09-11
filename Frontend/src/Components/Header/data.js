import { assets } from "../../assets/assets";

export const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  
  export const productData = [
    {
      id: 1,
      imageurl:
     "https://www.theindiaforum.in/sites/default/files/field/image/2022/06/21/ramkumar-radhakrishnan-wikimedia-1622193304-1622193304.jpeg",
      name: "FRESH MARKET WE'LL DELIVER EVERYTHING YOU NEED",
      price: "Harvested with Care, Delivered with Trust – Empowering Farmers, Serving Freshness",
      description: "SHOP NOW",
    },
    {
      id: 2,
      imageurl:
        "https://media.istockphoto.com/id/1301128630/photo/young-handsome-agronomist-and-farmer-inspecting-cotton-field-with-tablet.jpg?s=2048x2048&w=is&k=20&c=oy3yl1KRfraVecdpcJSR4A2RSY83WvDyli9ATvhXxss=",
      name: "Subscribe to our plan for the best fresh produce only for you",
      price: "Harvested with Care, Delivered with Trust – Empowering Farmers, Serving Freshness",
      description: "SUBSCRIBE",
    },
];