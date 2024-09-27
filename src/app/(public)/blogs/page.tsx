import React from "react";

const Blogs = () => {
  return (
    <div className="container flex h-[60vh] w-full flex-col items-center">
      <h1 className="my-20 text-5xl font-semibold tracking-widest">Blogs</h1>

      <div className="px-20">
        <br />
        <h2 className="font-merriweather text-2xl">This is Heading Merriweather</h2>
        <p className="font-merriweather text-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas itaque voluptas doloremque
          harum a ut sit sed optio enim vero explicabo consectetur porro suscipit fugiat, dolorem,
          ullam repellendus accusantium dolor.
        </p>
        <br />
        <h2 className="font-georgia text-2xl">This is Heading Georgia</h2>
        <p className="font-georgia text-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas itaque voluptas doloremque
          harum a ut sit sed optio enim vero explicabo consectetur porro suscipit fugiat, dolorem,
          ullam repellendus accusantium dolor.
        </p>
        <br />
        <h2 className="font-roboto text-2xl">This is Heading Roboto</h2>
        <p className="font-roboto text-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas itaque voluptas doloremque
          harum a ut sit sed optio enim vero explicabo consectetur porro suscipit fugiat, dolorem,
          ullam repellendus accusantium dolor.
        </p>
        <br />

        <h2 className="font-sans text-2xl">This is Heading Font-sans</h2>
        <p className="font-sans text-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas itaque voluptas doloremque
          harum a ut sit sed optio enim vero explicabo consectetur porro suscipit fugiat, dolorem,
          ullam repellendus accusantium dolor.
        </p>
        <br />
      </div>
    </div>
  );
};

export default Blogs;