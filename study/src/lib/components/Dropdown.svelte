<script>
  // let apps =
  //   "tap,zauth,tab,zout,mattermost,git,haldis,gamification,zess,events,pix,zinc".split(
  //     ","
  //   );

  let apps = [
    { img: "Gitea_Logo.svg" },
    { img: "haldis_black.png" },
    { img: "Mattermost_icon_denim.svg" },
    { img: "tap.ico" },
    { img: "tab.ico" },
    { img: "zess.svg" },
    { img: "zeus.svg" },
    { img: "Gitea_Logo.svg" },
    { img: "Mattermost_icon_denim.svg" },
    { img: "tap.ico" },
    { img: "zess.svg" },
    { img: "zeus.svg" },
  ];
</script>

<main>
  <div class="container">
    <svg width="0" height="0" aria-hidden="true">
      <!-- sRGB is what we normally want (but not default)-->
      <filter id="grain" color-interpolation-filters="sRGB">
        <!-- generate fine noise-->
        <feTurbulence type="fractalNoise" baseFrequency=".813" numOctaves="1"
        ></feTurbulence>
        <!-- use noise as displacement map-->
        <feDisplacementMap in="SourceGraphic" scale="600" xChannelSelector="R"
        ></feDisplacementMap>
        <!-- place filter input underneath to cover transparent edge pixels-->
        <feBlend in2="SourceGraphic"></feBlend>
        <!-- bump up saturation-->
        <!--feColorMatrix(type='saturate' values='1.125')-->
      </filter>
    </svg>
    <div class="noisyspectrum"></div>
  </div>
  <img id="noisesvg" src="/noise_a.svg" alt="noise svg" style="width: 10em;" />

  <div class="w95container">
    <svg width="0" height="0" aria-hidden="true">
      <filter id="grain-flat" color-interpolation-filters="sRGB">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.913"
          numOctaves="4"
          seed="21"
          result="noise"
        ></feTurbulence>

        <feComposite
          in="noise"
          in2="SourceGraphic"
          operator="arithmetic"
          k1="0"
          k2="0.4"
          k3="1.0"
          k4="0"
        ></feComposite>
      </filter>
    </svg>
    <div class="w95button" style="width: 20em; aspect-ratio: 1;">
      <div class="w95in1"></div>
    </div>
  </div>

  <svg width="0" height="0" aria-hidden="true">
      <filter id="icongrain" color-interpolation-filters="sRGB">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.913"
          numOctaves="4"
          seed="21"
          result="noise2"
        ></feTurbulence>

        <feComposite
          in="noise2"
          in2="SourceGraphic"
          operator="arithmetic"
          k1="0.7"
          k2="0"
          k3="1.0"
          k4="0"
        ></feComposite>
      </filter>
    </svg>

  <div id="concept">
    <img src="/zapp-concept-1.png" alt="concept" />
  </div>

  <div id="dropdown">
    <div
      class="origin-top-right absolute mt-2 w-95 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-4"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      part="dropdown"
    >
      <div
        class="container noisyspectrumbg absolute inset-0 rounded-md -z-10"
      ></div>
      <div class="grid grid-cols-3 gap-5" role="none">
        {#each apps as app}
          <div class="w-25 h-25">
            <div class="w95in1 w-25 h-25 style absolute ">
              <div class="" style="border-radius: 6px; width: 100%; height: 100%;">
                <button
                  class="w95button style flex items-center justify-center rounded-md text-white font-semibold shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  role="menuitem"
                  style="width: 100%; height: 100%;"
                  aria-label={app.img}
                  on:click={() => {
                    console.log(`${app.img} button clicked!`);
                    // Optionally close the dropdown after a button is clicked
                    // setIsOpen(false);
                  }}
                >
                </button>
              </div>
            </div>

            <div class="absolute" style="pointer-events: none;">
              <button
                class="flex items-center justify-center w-25 h-25 rounded-md text-white font-semibold shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                role="menuitem"
                style="pointer-events: none;"
                aria-label={app.img}
              >
                <img
                  src={`services/${app.img}`}
                  alt={app.img}
                  class="w95icon"
                />
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    height: 100vh;
    flex-direction: column;
  }

  #concept img {
    width: 16em;
  }

  .w95icon {
    width: 5.1em;
    aspect-ratio: 1;
    z-index: 100;
    filter: none;
    border-radius: 3px;
    filter: url(#icongrain);
  }

  .w95button .style {
    border-radius: 6px;
    background-color: transparent;
  }

  .w95button:before {
    content: " ";
    position: absolute;
    z-index: -1;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }

  .w95button .style::before {
    border-radius: 6px;
    border: 1px solid rgb(219, 203, 203);
  }

  .w95button::before {
    clip-path: inset(0 0 0 0);
    padding: 2px;
    /* outline: 18px solid gray; */
  }

  .w95button .style::before {
    filter: url(#grain-flat);
    background-clip: content-box; /* support: IE9+ */
    background-color: #969090;
    border-radius: 6px;
    border: 0.8px solid black;
  }

  .w95in1 {
    padding: 0px;
    clip-path: inset(0 0 0 0);
  }

  .w95in1 .style {
    border-radius: 6px;
    filter: url(#grain-flat);
    border: 1px solid black;
    background-color: #d6d6d6;
    transition: 0.3s;
  }

  .w95in1 .style:hover{
    background-color: orange;
  }

  .container {
    --b: linear-gradient(90deg, hsl(90, 100%, 0%), hsl(36, 100%, 65%)),
      linear-gradient(
        141.42857142857144deg,
        hsl(141.42857142857144, 100%, 0%),
        hsl(36, 82%, 53%)
      ),
      linear-gradient(
        192.85714285714286deg,
        hsl(192.85714285714286, 100%, 0%),
        hsl(192.85714285714286, 100%, 65%)
      ),
      linear-gradient(
        244.28571428571428deg,
        hsl(244.28571428571428, 100%, 0%),
        hsl(244.28571428571428, 100%, 65%)
      ),
      linear-gradient(
        295.7142857142857deg,
        hsl(295.7142857142857, 100%, 0%),
        hsl(91, 100%, 65%)
      ),
      linear-gradient(
        347.14285714285717deg,
        hsl(347.14285714285717, 100%, 0%),
        hsl(219, 100%, 65%)
      ),
      linear-gradient(
        38.571428571428555deg,
        hsl(38.571428571428555, 100%, 0%),
        hsl(27, 90%, 55%)
      );
  }

  svg[height="0"][aria-hidden="true"] {
    position: fixed;
  }

  .noisyspectrum {
    display: inline-block;
    width: 20em;
    aspect-ratio: 1;
    background: var(--b);
    background-blend-mode: lighten;
    clip-path: inset(0 0 0 0);

    filter: url(#grain);
  }

  .noisyspectrumbg {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: var(--b);
    background-blend-mode: lighten;
    clip-path: inset(0 0 0 0);

    filter: url(#grain);
  }

  .clearhover:hover {
    opacity: 0%;
  }

  .cancelfilter {
    filter: none;
    background: none;
    background-color: transparent;
  }
</style>
