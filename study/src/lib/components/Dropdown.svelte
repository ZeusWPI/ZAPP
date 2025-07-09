<script>
  let apps =
    "tap,zauth,tab,zout,mattermost,git,haldis,gamification,zess,events,pix,zinc".split(
      ","
    );
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

  <div class="w95container">
    <svg width="0" height="0" aria-hidden="true">
      <filter id="grain-flat" color-interpolation-filters="sRGB">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.813"
          numOctaves="4"
          result="noise"
        ></feTurbulence>

        <feComposite
          in="noise"
          in2="SourceGraphic"
          operator="arithmetic"
          k1="0"
          k2="0.3"
          k3="1"
          k4="0"
        ></feComposite>
      </filter>
    </svg>
    <div class="w95button" style="width: 20em; aspect-ratio: 1;"></div>
  </div>

  
  <div id="concept">
    <img src="/zapp-concept-1.png" alt="concept" />
  </div>
  
  <img id="noisesvg" src="/noise_a.svg" alt="noise svg" style="width: 10em;" />
  <div id="dropdown">
    <div
      class="origin-top-right absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-4"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      part="dropdown"
    >
      <div
        class="container noisyspectrumbg absolute inset-0 rounded-md -z-10"
      ></div>
      <div class="grid grid-cols-3 gap-2" role="none">
        {#each apps as app}
          <div>
            <button
              class="w95button flex items-center justify-center w-16 h-16 rounded-md text-white font-semibold shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              role="menuitem"
              on:click={() => {
                console.log(`${app} button clicked!`);
                // Optionally close the dropdown after a button is clicked
                // setIsOpen(false);
              }}
            >
              {app}
            </button>
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

  .w95button {
    background-color: #a0a0a4;
    filter: url(#grain-flat);
    clip-path: inset(0 0 0 0);
  }

  .container {
    --b: linear-gradient(90deg, hsl(90, 100%, 0%), hsl(90, 100%, 65%)),
      linear-gradient(
        141.42857142857144deg,
        hsl(141.42857142857144, 100%, 0%),
        hsl(141.42857142857144, 100%, 65%)
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
        hsl(295.7142857142857, 100%, 65%)
      ),
      linear-gradient(
        347.14285714285717deg,
        hsl(347.14285714285717, 100%, 0%),
        hsl(347.14285714285717, 100%, 65%)
      ),
      linear-gradient(
        38.571428571428555deg,
        hsl(38.571428571428555, 100%, 0%),
        hsl(38.571428571428555, 100%, 65%)
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
</style>
