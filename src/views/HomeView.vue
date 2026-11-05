<template>
  <Loading :active="isLoading"></Loading>
  <TheCouponModal />
  <TheHeader />
  <div data-aos="fade-down" data-aos-delay="200">
    <section
      class="banner d-flex align-items-center mb-5 mb-lg-8"
      ref="banner"
      :style="{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <div class="container-xl">
        <div class="row">
          <div class="col-md-6">
            <div class="d-flex flex-column">
              <h1 class="text-light fw-bolder fs-3 fs-md-1">Enjoy your every stride</h1>
              <p class="text-light fs-6 fs-md-5 content-truncate fw-light">
                Professional running gear, made to help you push your limits with every step.
              </p>
              <RouterLink
                to="/products"
                class="btn btn-warning rounded-0 align-self-start py-1 py-md-2 px-4 px-md-6 fs-6 fs-md-5"
              >
                Shop Now
              </RouterLink>
            </div>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
    </section>
  </div>
  <section class="container-xl g-3 mb-5 mb-lg-8 section-products">
    <div data-aos="fade-up" data-aos-delay="200">
      <h2 class="text-center mb-4 mb-lg-5 fw-bold">Clearing</h2>
      <Swiper v-bind="swiperOptions">
        <SwiperSlide v-for="item in saleProducts" :key="item.id">
          <ProductCard :product="item" @add-cart="addCart" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
  <section class="section-feature bg-light py-5 py-md-8 mb-5 mb-lg-6">
    <div class="container-xl col-12 col-lg-8">
      <Swiper v-bind="featureOptions">
        <SwiperSlide>
          <div class="text-center">
            <svg
              fill="#414141"
              id="fi_4259379"
              enable-background="new 0 0 512 512"
              height="120"
              viewBox="0 0 512 512"
              width="120"
              class="p-3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="m465.981 334.032c-5.572-5.572-12.98-8.641-20.861-8.641-2.938.21-58.178-.582-58.968.629l-67.034-67.036 11.354-11.354c7.719-7.718 6.319-19.578-.783-26.962l56.23-56.232c6.857-6.857-3.749-17.463-10.606-10.606l-56.23 56.232-17.137-17.138 112.22-112.224 17.137 17.138-28.302 28.302c-6.857 6.857 3.75 17.463 10.606 10.606l29.76-29.761c10.519 4.206 23.352.513 30.04-8.583l37.028-47.942c2.306-2.986 2.036-7.22-.632-9.888l-38.374-38.375c-2.667-2.668-6.901-2.938-9.888-.632l-47.94 37.029c-9.139 6.719-12.785 19.532-8.583 30.041l-113.678 113.682c-7.237-7.274-19.357-8.387-26.946-.797l-11.369 11.369-66.404-66.407v-59.6c0-7.88-3.068-15.288-8.641-20.861l-37.378-37.38c-5.572-5.572-12.98-8.641-20.861-8.641h-46.049c-5.277 0-9.992 3.15-12.011 8.025-2.02 4.875-.914 10.437 2.818 14.167l42.564 42.566c1.365 1.365 1.365 3.586 0 4.951l-35.94 35.941c-1.365 1.365-3.585 1.365-4.951 0l-43.979-43.981c-3.732-3.731-9.293-4.839-14.167-2.818-4.876 2.019-8.026 6.734-8.026 12.011v48.883c0 7.88 3.068 15.289 8.641 20.861l37.379 37.38c5.572 5.572 12.98 8.641 20.86 8.641h59.597l52.538 52.539-149.759 130.18c-34.712 30.174-36.626 84.978-4.104 117.501 32.474 32.476 87.353 30.575 117.497-4.104l130.174-149.764 53.185 53.187c-1.206.755-.422 56.089-.629 58.97 0 7.88 3.069 15.289 8.641 20.861l37.361 37.362c5.493 5.494 13.094 8.642 20.863 8.641h.055l53.187-.104c7.857-.015 15.245-3.083 20.803-8.641l37.071-37.073c5.572-5.572 8.641-12.98 8.641-20.861v-53.049c0-7.88-3.068-15.289-8.641-20.861zm-47.752-275.694c.239-3.05 2.068-5.964 4.465-7.814l42.794-33.055 29.043 29.044-33.054 42.796c-3.524 4.514-9.723 6.186-14.811 2.494-9.224-7.234-17.104-16.919-25.387-25.203-2.105-2.106-3.298-5.09-3.05-8.262zm-143.228 133.788c1.645-1.365 3.29-1.365 4.936 0l39.93 39.931c1.369 1.369 1.369 3.597 0 4.966l-11.354 11.354-44.881-44.882zm-218.375-24.746-37.379-37.38c-2.739-2.739-4.247-6.381-4.247-10.255v-44.056l40.567 40.569c7.138 7.138 19.026 7.138 26.164 0l35.94-35.941c7.213-7.213 7.213-18.95 0-26.164l-39.151-39.153h41.222c3.874 0 7.515 1.508 10.254 4.248l37.378 37.38c2.739 2.739 4.248 6.381 4.248 10.254v58.871l-45.874 45.875h-58.868c-3.873-.001-7.515-1.509-10.254-4.248zm79.978 299.451-51.322-51.325c-6.856-6.858-17.463 3.749-10.606 10.606l51.809 51.811c-25.36 23.695-66.251 22.792-90.726-1.684-24.476-24.477-25.373-65.372-1.684-90.73l12.467 12.467c6.856 6.858 17.463-3.749 10.606-10.606l-11.981-11.981 144.48-125.589 72.544 72.547zm141.201-150.084c-.031-.031-.062-.062-.093-.093l-137.887-137.891 38.931-38.933 124.443 124.447c.006.007.013.013.02.02l68.97 68.972c-13.354 12.421-26.51 25.575-38.932 38.933zm219.195 128.575c0 3.874-1.508 7.516-4.247 10.254l-37.071 37.072c-2.731 2.731-6.363 4.24-10.226 4.248l-53.187.104c-3.827.007-7.575-1.541-10.282-4.248 0 0-37.361-37.362-37.361-37.362-2.739-2.739-4.247-6.381-4.247-10.254v-52.863c0-3.863 1.51-7.517 4.247-10.254l37.379-37.38c2.808-2.74 6.322-4.248 10.254-4.248h52.861c3.874 0 7.515 1.508 10.254 4.248l37.379 37.38c2.739 2.739 4.247 6.38 4.247 10.254z"
                ></path>
                <path
                  d="m452.311 367.034c-5.572-5.572-12.981-8.641-20.86-8.641h-25.522c-7.88 0-15.288 3.069-20.86 8.641l-18.047 18.048c-5.572 5.572-8.641 12.98-8.641 20.861v25.523c0 7.88 3.068 15.288 8.641 20.861l18.002 18.003c5.507 5.507 13.132 8.656 20.918 8.641l25.848-.05c7.858-.015 15.246-3.084 20.803-8.641l17.766-17.767c5.572-5.572 8.641-12.98 8.641-20.861v-25.709c0-7.88-3.069-15.289-8.641-20.861zm11.688 64.618c0 3.874-1.508 7.516-4.247 10.254l-17.766 17.767c-2.731 2.731-6.363 4.24-10.226 4.247l-25.848.05h-.028c-3.817 0-7.553-1.547-10.253-4.247l-18.002-18.002c-2.739-2.74-4.248-6.381-4.248-10.255v-25.523c0-3.874 1.508-7.516 4.247-10.254l18.047-18.048c2.739-2.739 6.381-4.248 10.254-4.248h25.522c3.873 0 7.515 1.509 10.254 4.248l18.047 18.048c2.739 2.739 4.247 6.38 4.247 10.254z"
                ></path>
                <path
                  d="m189.103 178.503c-2.929-2.929-7.678-2.929-10.606 0-2.929 2.929-2.929 7.677 0 10.606l140.035 140.041c6.856 6.858 17.463-3.749 10.606-10.606z"
                ></path>
              </g>
            </svg>
            <h3 class="fw-bold">Repair</h3>
            <p class="fs-6 fw-medium">
              We offer repair services to extend the lifespan of your products.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="text-center">
            <svg
              fill="#414141"
              height="120"
              viewBox="0 1 511.99981 511"
              width="120"
              xmlns="http://www.w3.org/2000/svg"
              id="fi_1585147"
              class="p-3"
            >
              <path
                d="m506.8125 111.230469-199.40625-109.496094c-2.996094-1.6445312-6.628906-1.6445312-9.625 0l-75.160156 41.269531c-1.585938.417969-3.066406 1.214844-4.292969 2.359375l-119.949219 65.867188c-3.199218 1.753906-5.1875 5.113281-5.1875 8.765625v132.429687c-20.234375 6.328125-38.777344 17.488281-54.195312 32.910157-40.1875 40.183593-50.433594 101.472656-25.496094 152.507812 2.421875 4.960938 8.410156 7.019531 13.371094 4.59375 4.964844-2.425781 7.019531-8.414062 4.597656-13.375-21.1875-43.363281-12.480469-95.4375 21.667969-129.585938 21.355469-21.355468 49.746093-33.117187 79.945312-33.117187s58.589844 11.761719 79.945313 33.117187c21.351562 21.351563 33.113281 49.742188 33.113281 79.941407s-11.761719 58.589843-33.117187 79.945312c-34.148438 34.148438-86.222657 42.855469-129.585938 21.667969-4.960938-2.425781-10.949219-.367188-13.371094 4.59375-2.425781 4.964844-.371094 10.953125 4.59375 13.375 18.589844 9.085938 38.535156 13.5 58.335938 13.5 34.542968-.003906 68.625-13.449219 94.171875-38.996094 11.714843-11.714844 20.972656-25.230468 27.523437-39.921875l43.089844 23.660157c1.5.824218 3.15625 1.234374 4.8125 1.234374s3.316406-.410156 4.8125-1.234374l199.40625-109.492188c3.199219-1.757812 5.1875-5.117188 5.1875-8.765625v-69.496094c0-5.523437-4.476562-10-10-10s-10 4.476563-10 10v63.578125l-179.375 98.496094v-196.171875l59.199219-32.507813v51.53125c0 3.539063 1.867187 6.8125 4.910156 8.609376 1.570313.925781 3.328125 1.390624 5.089844 1.390624 1.65625 0 3.316406-.410156 4.820312-1.238281l42.730469-23.519531c3.195312-1.757812 5.175781-5.113281 5.175781-8.757812v-62.460938l57.449219-31.542969v52.597657c0 5.523437 4.476562 10 10 10s10-4.476563 10-10v-69.496094c0-3.648438-1.988281-7.011719-5.1875-8.765625zm-204.21875-89.324219 178.628906 98.089844-56.347656 30.941406-178.628906-98.089844zm0 196.175781-178.628906-98.085937 58.414062-32.078125 178.632813 98.085937zm79.191406-43.484375-178.628906-98.085937 22.3125-12.253907 178.632812 98.085938zm-154.617187 110.738282c-25.132813-25.132813-58.546875-38.972657-94.085938-38.972657-6.722656 0-13.363281.496094-19.890625 1.46875v-110.9375l179.4375 98.53125v196.171875l-31.144531-17.101562c3.066406-11.289063 4.652344-23.0625 4.652344-35.078125 0-35.539063-13.839844-68.953125-38.96875-94.082031zm187.386719-60.347657-22.730469 12.511719v-45.597656l22.730469-12.480469zm0 0"
              ></path>
              <path
                d="m502 219.441406c-2.628906 0-5.210938 1.070313-7.070312 2.929688-1.859376 1.859375-2.929688 4.4375-2.929688 7.070312 0 2.628906 1.070312 5.207032 2.929688 7.066406 1.859374 1.863282 4.441406 2.929688 7.070312 2.929688s5.210938-1.066406 7.070312-2.929688c1.859376-1.859374 2.929688-4.4375 2.929688-7.066406 0-2.632812-1.070312-5.210937-2.929688-7.070312-1.859374-1.859375-4.441406-2.929688-7.070312-2.929688zm0 0"
              ></path>
              <path
                d="m99.457031 389.417969c2.558594 0 5.121094-.976563 7.070313-2.925781 3.90625-3.90625 3.90625-10.238282 0-14.144532l-6.925782-6.929687h59.101563c14.335937 0 26 11.664062 26 26 0 14.335937-11.664063 26-26 26h-35.019531c-5.523438 0-10 4.476562-10 10 0 5.519531 4.476562 9.996093 10 9.996093h35.019531c25.363281 0 46-20.632812 46-45.996093s-20.636719-45.996094-46-45.996094h-59.101563l6.925782-6.929687c3.90625-3.90625 3.90625-10.238282 0-14.144532-3.902344-3.902344-10.234375-3.902344-14.140625 0l-24 24c-3.902344 3.90625-3.902344 10.238282 0 14.144532l24 23.996093c1.953125 1.953125 4.511719 2.929688 7.070312 2.929688zm0 0"
              ></path>
              <path
                d="m46.074219 476.449219c-2.84375 0-5.667969-1.210938-7.640625-3.558594l-.019532-.023437c-3.554687-4.226563-3.007812-10.53125 1.21875-14.085938 4.226563-3.558594 10.535157-3.011719 14.089844 1.214844 3.550782 4.230468 3.015625 10.546875-1.210937 14.101562-1.878907 1.578125-4.164063 2.351563-6.4375 2.351563zm0 0"
              ></path>
            </svg>

            <h3 class="fw-bold">Return service</h3>
            <p class="fs-6 fw-medium">7-Day Satisfaction Guarantee, Free Returns & Exchanges</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="text-center">
            <svg
              fill="#414141"
              id="fi_5627211"
              height="120"
              viewBox="0 0 517.1 335.6"
              stroke-width="100"
              width="120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_31">
                <path
                  d="m506.8 199.5v-8.6-7.4l-61.6-84.1-13.9-19c-3.7-5-9.4-8-15.6-8.2l-77.4-1.9v-35.4c0-7.5-6-13.5-13.5-13.5h-283.3c-7.5 0-13.5 6-13.6 13.5v26.8h-6.2v10h6.3l.2 197.8c0 7.5 6.1 13.6 13.6 13.6h36.5l.3-4.7c1.9-29.2 25.4-50.4 55.9-50.4s54.6 21.7 56.4 50.4l.3 4.7h157.5l.4-4.5c3.2-30.9 30.9-53.4 61.8-50.2 26.5 2.7 47.4 23.7 50.2 50.2l.4 4.5h30.5c8.2-.1 14.7-6.6 14.8-14.8v-28.8c6.1-2 10.3-7.8 10.3-14.2v-11.7c0-6.4-4.2-12.1-10.3-14.1zm-306.4 73.6c-4.4-31.7-31.9-55.1-65.9-55.1-16.6-.2-32.7 5.8-45.2 16.8-11.1 9.9-18.3 23.5-20.2 38.3h-27.3c-2 0-3.6-1.6-3.6-3.6l-.2-197.8h107.1v-10h-107.2v-26.8c.1-1.9 1.7-3.5 3.6-3.5h283.2c1.9 0 3.5 1.6 3.5 3.5l.3 238.2zm292.1-92.2h-98.4c-2 0-3.7-1.7-3.7-3.7v-64.1c-.1-2 1.5-3.6 3.5-3.7h.2 46l18.3 24.9zm4.3 87.3c-.1 2.6-2.2 4.7-4.8 4.8h-21.6c-6.3-36.1-40.7-60.2-76.8-53.8-27.5 4.8-49 26.3-53.8 53.8h-1.3v-192.6l76.9 1.8c3.1.1 6 1.6 7.8 4.1l9.6 13.1h-38.7c-7.6 0-13.7 6.1-13.7 13.7v64.1c0 7.6 6.1 13.7 13.7 13.7h102.7v7.9c-8 .3-14.3 6.8-14.3 14.8v11.7c0 8 6.3 14.5 14.3 14.9zm10.3-42.9c0 .6-.1 1.2-.3 1.7-.7 1.9-2.6 3.2-4.6 3.2h-5.4c-2.4-.3-4.3-2.3-4.3-4.8v-11.8c0-2.5 1.9-4.5 4.3-4.8h5.4c2.1 0 3.9 1.3 4.6 3.2.2.5.3 1.1.3 1.6z"
                ></path>
                <path
                  d="m405.1 233.3c-28.6 0-51.9 22.9-51.9 51.1s23.3 51.2 51.9 51.2 51.9-23 51.9-51.2-23.3-51.1-51.9-51.1zm0 92.3c-23.1 0-41.9-18.5-41.9-41.2s18.8-41.1 41.9-41.1 41.9 18.5 41.9 41.1-18.8 41.2-41.9 41.2z"
                ></path>
                <path
                  d="m405.1 258.9c-14.1.2-25.4 11.7-25.2 25.8s11.7 25.4 25.8 25.2c14-.2 25.2-11.5 25.2-25.5-.1-14.2-11.6-25.6-25.8-25.5zm0 41c-8.6-.2-15.4-7.2-15.2-15.8s7.2-15.4 15.8-15.2c8.4.2 15.2 7.1 15.2 15.5-.1 8.6-7.1 15.6-15.7 15.5z"
                ></path>
                <path
                  d="m134.5 233.3c-28.6 0-51.9 22.9-51.9 51.1s23.3 51.2 51.9 51.2 51.9-23 51.9-51.2-23.3-51.1-51.9-51.1zm0 92.3c-23.1 0-41.9-18.5-41.9-41.2s18.8-41.1 41.9-41.1 41.9 18.5 41.9 41.1-18.8 41.2-41.9 41.2z"
                ></path>
                <path
                  d="m134.5 258.9c-14.1.2-25.3 11.8-25.1 25.9s11.8 25.3 25.9 25.1c13.9-.2 25.1-11.6 25.1-25.5-.1-14.2-11.7-25.6-25.9-25.5zm0 41c-8.6-.2-15.3-7.3-15.1-15.9s7.3-15.3 15.9-15.1c8.4.2 15.1 7.1 15.1 15.5-.1 8.6-7.1 15.6-15.7 15.5-.1 0-.1 0-.2 0z"
                ></path>
                <path d="m207.4 304.2h16.6v10h-16.6z"></path>
                <path d="m236.3 304.2h92.6v10h-92.6z"></path>
                <path d="m79.6 0h16.6v10h-16.6z"></path>
                <path d="m108.4 0h92.6v10h-92.6z"></path>
                <path
                  d="m1.4 60.4h10v12.7h-10z"
                  transform="matrix(.016 -1 1 .016 -60.41 72.132)"
                ></path>
                <path d="m49.9 195.8h54.1v10h-54.1z"></path>
                <path d="m121.2 195.8h166.7v10h-166.7z"></path>
                <path
                  d="m122.9 136.9v-1.4c-.1-1.8-1.6-3.3-3.4-3.3h-17.5v-16.3h19.2c1.8 0 3.3-1.5 3.4-3.3v-1.4c0-1.9-1.5-3.4-3.4-3.4h-28.5v54.1c0 1.8 1.5 3.3 3.3 3.3h2.6c1.8 0 3.3-1.5 3.4-3.3v-21.7h17.5c1.8 0 3.3-1.5 3.4-3.3z"
                ></path>
                <path
                  d="m136 165.2h2.6c1.8 0 3.3-1.5 3.3-3.3v-20.6h5.6c6 .2 8.5 2.7 10.1 9.9s2.9 12 3.8 13.5l.3.5h9.8l-.8-1.6c-1.2-2-2.5-7.7-4.2-14.9-1.2-5.3-3.5-9-6.8-10.9 5.7-2.5 9.3-8.1 9.1-14.3.1-4.3-1.6-8.4-4.7-11.3-3.7-3.3-8.8-4.8-16.7-4.8-4.7-.1-9.3.3-13.9 1.2h-.9v53.2c0 1.9 1.5 3.4 3.4 3.4zm5.9-49.7c2-.4 4-.6 6-.5 5.3.1 11.6 1.7 11.6 9.3 0 5.7-4.4 9.4-11.4 9.4h-6.2z"
                ></path>
                <path
                  d="m210 161.9v-1.4c0-1.9-1.5-3.4-3.4-3.4h-20.6v-17.8h18.2c1.8 0 3.3-1.5 3.3-3.3v-1.4c0-1.8-1.5-3.3-3.3-3.3h-18.2v-15.4h19.4c1.8 0 3.3-1.5 3.4-3.3v-1.4c0-1.9-1.5-3.4-3.4-3.4h-28.7v57.4h29.9c1.8 0 3.3-1.5 3.4-3.3z"
                ></path>
                <path
                  d="m250.3 161.9v-1.4c0-1.8-1.5-3.3-3.3-3.4h-20.6v-17.8h18.1c1.8 0 3.3-1.5 3.4-3.3v-1.4c-.1-1.8-1.6-3.3-3.4-3.3h-18.1v-15.4h19.3c1.8 0 3.3-1.5 3.4-3.3v-1.4c0-1.9-1.5-3.4-3.4-3.4h-28.6v57.4h29.9c1.8 0 3.3-1.5 3.3-3.3z"
                ></path>
              </g>
            </svg>
            <h3 class="fw-bold">Free shipping</h3>
            <p class="fs-6 fw-medium">Free shipping is available for orders over $499.</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
  <!-- <section class="section-ad mb-8">
    <img :src="adImg" class="bg-cover w-100" />
  </section> -->
  <section class="container-xl section-newproduct g-3 mb-5 mb-lg-8">
    <div data-aos="fade-up" data-aos-delay="200">
      <h2 class="text-center mb-4 mb-lg-5 fw-bold d-md-none">News Product</h2>
      <div class="newsProduct d-flex">
        <div class="area-img flex-fill position-relative">
          <img :src="areaImg" />
          <div class="position-absolute top-0 end-50 fs-3 p-3 pe-0 fw-bolder text-white z-2">
            News Product
          </div>
        </div>
        <div class="newproduct-content">
          <Swiper v-bind="swiper2Options">
            <SwiperSlide v-for="item in newProducts" :key="item.id">
              <ProductCard :product="item" @add-cart="addCart" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
  <section class="container-xl g-3 mb-5 mb-lg-8">
    <div data-aos="fade-up" data-aos-delay="200">
      <h2 class="text-center mb-4 mb-lg-5 fw-bold">Most Popular</h2>
      <Swiper v-bind="swiperOptions">
        <SwiperSlide v-for="item in popularProducts" :key="item.id">
          <ProductCard :product="item" @add-cart="addCart" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
  <section class="bg-light py-5 py-lg-8 mb-5 mb-lg-8">
    <div class="container-xl">
      <h2 class="text-center mb-3 mb-lg-5 fw-bold">Ratings & Reviews</h2>
      <Swiper v-bind="reviewsOptions">
        <SwiperSlide v-for="review in reviews" :key="review.id">
          <div class="card border-0 card-reviews bg-light">
            <div class="card-body">
              <div class="fs-5">{{ review.stars }}</div>
              <p class="fs-4 fw-medium mb-3">{{ review.title }}</p>
              <p class="card-text mb-4 fs-6 fw-medium content-truncate truncate-3">
                {{ review.text }}
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <!-- <div class="row">
        <div class="card border-0 card-reviews bg-light">
          <div class="card-body">
            <div class="fs-5">★★★★★</div>
            <p class="fs-4 fw-medium mb-3">Lovely winter outfit</p>
            <p class="card-text mb-4 fs-6 fw-medium content-truncate truncate-3">
              Great quality onesie with matching pants. Has a good amount of stretch to grow with
              the baby.
            </p>
          </div>
        </div>
      </div> -->
    </div>
  </section>
  <section class="mb-5 mb-lg-8">
    <div class="container-xl col-12 col-md-8">
      <div class="text-center">
        <h2 class="text-center mb-4 mb-lg-5 fw-bold">Selected Brands</h2>
        <div class="brands">
          <div class="row">
            <div class="col">
              <img v-for="(icon, index) in brands" :key="index" :src="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <section class="section-contact footer-top text-white">
    <div class="container py-8">
      <div class="h3">Contact Us</div>
      <div class="h5 mb-4">
        Need interior design advice or customize furniture arrangement? Contact us.
      </div>
      <button class="btn btn-primary rounded-0 px-6 py-3">Contact</button>
    </div>
  </section> -->

  <section
    class="b-banner d-none d-md-flex align-items-center"
    :style="{
      backgroundImage: `url(${fbannerImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div class="container-xl">
      <div class="row">
        <div class="col-lg-7"></div>
        <div class="col-lg-5">
          <div class="d-flex flex-column">
            <h2 class="text-light fw-medium mb-4 fs-1 text-end">
              A New Perspective On Performance Apparel™
            </h2>
            <RouterLink
              to="/products"
              class="btn btn-primary rounded-0 align-self-end py-2 px-6 fs-5"
            >
              Shop Now
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <footer class="bg-primary text-white">
    <div class="container pt-5 pt-lg-7 pb-3 pb-lg-5">
      <div class="d-flex justify-center justify-content-between align-items-center mb-4">
        <a class="navbar-brand" href="#"
          ><img src="@/assets/images/logo-light.svg" style="width: 190px"
        /></a>
        <ul class="footer-nav list-unstyled d-none d-md-flex m-0">
          <li>
            <a class="link-hover link-light text-decoration-none p-2 fw-semibold fs-6" href=""
              >FAQ</a
            >
          </li>
          <li>
            <a class="link-hover link-light text-decoration-none p-2 fw-semibold fs-6" href=""
              >Delivery</a
            >
          </li>
          <li>
            <a class="link-hover link-light text-decoration-none p-2 fw-semibold fs-6" href=""
              >Return</a
            >
          </li>
          <li>
            <a class="link-hover link-light text-decoration-none p-2 fw-semibold fs-6" href=""
              >Contact Us</a
            >
          </li>
        </ul>
      </div>
      <div class="d-flex justify-center justify-content-between align-items-center">
        <ul class="list-unstyled">
          <li>Email : wavo9827@carpento.com</li>
          <li>Customer Service : 9:00 AM - 5:00 PM | Monday to Friday</li>
          <li>No. 123, Xingbei Rd., Wenshan District, Taipei City, Taiwan</li>
        </ul>
      </div>
    </div>
    <div class="text-center border-top border-light">
      <p class="mb-0 px-1 py-4 py-lg-2">
        © 2026 Apexrun | Personal Portfolio | Non-Commercial Use | Images: Unsplash、magnific
      </p>
    </div>
  </footer> -->

  <TheFooter />
</template>

<script>
// ===== 圖片 =====
import bannerImg from "@/assets/images/banner.jpg";
import fbannerImg from "@/assets/images/f-banner.jpg";
import areaImg from "@/assets/images/area.jpg";

// ===== 購物車 =====
import { useCartStore } from "@/stores/cart";
import { Offcanvas } from "bootstrap";

// ===== Swiper =====
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// ===== 元件 =====
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import ProductCard from "@/components/ProductCard.vue";
import TheCouponModal from "@/components/ui/TheCouponModal.vue";

// ===== 抽出去的資料與設定 =====
import reviews from "@/data/reviews";
import brands from "@/data/brands";
import {
  productOptions,
  newProductOptions,
  reviewsOptions,
  featureOptions,
} from "@/config/swiperOptions";

export default {
  components: {
    TheHeader,
    TheFooter,
    ProductCard,
    TheCouponModal,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      isLoading: false,
      bannerImg,
      fbannerImg,
      areaImg,
      brands,
      reviews,
      allProducts: [],
      saleProducts: [],
      newProducts: [],
      popularProducts: [],
      swiperOptions: productOptions,
      swiper2Options: newProductOptions,
      reviewsOptions,
      featureOptions,
    };
  },
  mounted() {
    //頁面掛載後，監聽滾動事件，每次滾動就呼叫 handleParallax。
    window.addEventListener("scroll", this.handleParallax);
  },
  beforeUnmount() {
    //頁面離開前，移除監聽，避免記憶體洩漏。
    window.removeEventListener("scroll", this.handleParallax);
  },
  methods: {
    handleParallax() {
      if (!this.$refs.banner) return;
      const scrollY = window.scrollY;
      this.$refs.banner.style.backgroundPositionY = `${scrollY * 0.5}px`;
    },
    getProduct() {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.allProducts = res.data.products;
          this.saleProducts = this.allProducts.filter((p) => p.origin_price > p.price);
          this.newProducts = [...this.allProducts].reverse().slice(0, 6);
          this.popularProducts = [...this.allProducts].sort(() => Math.random() - 0.5).slice(0, 6);
        })
        .catch((err) => {
          console.error("取得商品失敗：", err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    addCart(id) {
      this.cartStore.addCart(id, 1).then(() => {
        const el = document.getElementById("CartOffcanvas");
        const offcanvas = Offcanvas.getOrCreateInstance(el);
        if (!el.classList.contains("show")) {
          offcanvas.show();
        }
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
