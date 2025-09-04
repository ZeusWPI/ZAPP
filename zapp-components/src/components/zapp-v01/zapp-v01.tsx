import { Component, Prop, h, State, Build } from '@stencil/core';
import { getAssetPath } from '@stencil/core';

import { setAssetPath } from '@stencil/core';

if (!Build.isDev) {
  setAssetPath(`https://zapp.zeus.gent/zapp-components/`);
}

// const testcookiekey = 'zapptestcookie'
@Component({
  tag: 'zapp-v01',
  styleUrl: 'zapp-v01.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class ZappV01 {
  @Prop() apps = [
    { img: "git.png", url: "https://git.zeus.gent", tooltip: "Git" },
    { img: "zess.svg", url: "https://zess.zeus.gent", tooltip: "ZESS: Kelder logs" },
    { img: "Mattermost_icon_denim.svg", url: "https://mattermost.zeus.gent", class: "mattermost", tooltip: "Chat" },
    { img: "haldis_black.png", url: "https://haldis.zeus.gent", tooltip: "Haldis: Eten bestellen" },
    { img: "tap.ico", url: "https://tap.zeus.gent", tooltip: "TAP: Drank kopen" },
    { img: "tab.ico", url: "https://tab.zeus.gent", tooltip: "TAB: Geld beheren" },
    { img: "zeus.svg", url: "https://zeus.gent", tooltip: "Zeus site" },
    { img: "codimd.png", url: "https://codimd.zeus.gent", tooltip: "CodiMD: Notities" },
    { img: "profile_nobg.png", url: "https://zauth.zeus.gent", class: "profile", tooltip: "Zauth profiel" },
  ];

  // private getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2){
  //     const value = parts.pop().split(';').shift();
  //     return value;
  //   }
  //   else{
  //     console.error('cookie not found')
  //   }
  // }

  @State() open: boolean = false;

  // private getRootDomain() {
  //   const hostname = window.location.hostname;

  //   // Handle localhost and IP addresses
  //   if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
  //     return hostname;
  //   }

  //   // For regular domains, get the last two parts
  //   const parts = hostname.split('.');
  //   return parts.slice(-2).join('.');
  // }

  // private setCookieOnRootDomain(name, value, options) {
  //   const { days = 30, secure = false, sameSite = 'Lax' } = options;

  //   const rootDomain = this.getRootDomain();
  //   const date = new Date();
  //   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  //   let cookieString = `${name}=${value}; expires=${date.toUTCString()}; domain=.${rootDomain}; path=/; SameSite=${sameSite}`;

  //   if (secure) {
  //     cookieString += '; Secure';
  //   }

  //   document.cookie = cookieString;
  // }

  render() {
    // Main container for the dropdown, centered on the screen
    return (
      <div class="relative inline-block text-left" style={{ width: '100%', aspectRatio: '1 / 1' }}>
        {/* Main dropdown button (the orange square) */}
        <div class={"zappbutton " + (this.open ? 'rotated' : '')} style={{ width: '100%', height: '100%' }}>
          <button
            type="button"
            class="inline-flex justify-center items-center rounded-lg text-white font-bold text-xl shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
            id="menu-button"
            style={{ width: '100%', height: '100%' }}
            part='openbutton'
            aria-expanded={open}
            aria-haspopup="true"
            onClick={() => {
              this.open = !this.open;
            }}
          >
            <img part='zappicon' src={getAssetPath('assets/openbutton_beta1.svg')} />
          </button>
        </div>

        {/* Dropdown panel, conditionally rendered based on 'isOpen' state */}
        {this.open && (
          <div id="dropdown">
            <div
              class="dropdown origin-top-left absolute mt-2 w-95 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              part="dropdown"
              ref={(el: HTMLDivElement | null) => {
                const self = this as any;

                // Cleanup when unmounting
                if (!el) {
                  if (self.__zappOutsideHandler) {
                    document.removeEventListener('click', self.__zappOutsideHandler);
                    self.__zappOutsideHandler = undefined;
                  }
                  return;
                }

                // Positioning logic
                requestAnimationFrame(() => {
                  const pad = 8;
                  el.style.left = '0px';
                  el.style.right = 'auto';
                  el.style.transform = '';
                  const rect = el.getBoundingClientRect();
                  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                  const maxLeft = vw - pad - rect.width;
                  const maxTop = vh - pad - rect.height;

                  const targetLeft = Math.min(Math.max(rect.left, pad), maxLeft);
                  const targetTop = Math.min(Math.max(rect.top, pad), maxTop);

                  const dx = targetLeft - rect.left;
                  const dy = targetTop - rect.top;

                  if (dx !== 0 || dy !== 0) {
                    el.style.transform = `translate(${dx}px, ${dy}px)`;
                    el.style.transformOrigin = dx < 0 ? 'top right' : 'top left';
                  } else {
                    el.style.transformOrigin = 'top left';
                  }
                });

                // Outside click handler
                if (!self.__zappOutsideHandler) {
                  self.__zappOutsideHandler = (ev: MouseEvent) => {
                    const path = ev.composedPath();
                    const clickedInside =
                      path.includes(el) ||
                      path.some((n: any) => n && n.id === 'menu-button');
                    if (!clickedInside) {
                      this.open = false;
                    }
                  };
                  document.addEventListener('click', self.__zappOutsideHandler);
                }
              }}
            >
              <div class="topbar" >
                <div class="button buttona">
                  ZAPP V1
                </div>
                <div class="button buttonb" title="coming soon™">CONFIG</div>
                <div class="button buttonc" title="coming soon™">LOGIN</div>
                <a href='https://git.zeus.gent/roparet/zapp' target='_blank'>
                  <div class="button buttond">SOURCE</div>
                </a>
                <button
                  class="button buttonpower"
                  type="button"
                  aria-label="Close"
                  onClick={() => { this.open = false; }}
                >
                  ⏻
                </button>
              </div>
              <div class="bborder bborder1" >
                <div class="dborder dborder1" >
                  <div class="dborder dborder3">
                    <div class="dborder dborder4">
                      <div class="p-4 cborder1 container">
                        <div class="noisyspectrumbg absolute inset-0 rounded-md -z-10"></div>
                        <div class="grid grid-cols-3 gap-5" role="none">
                          {this.apps.map((app, _) => (
                            <div class="w-25 h-25">
                              <a href={app.url} target='_blank'
                                class="w95in1 w-25 h-25 style absolute"
                                aria-label={app.img}
                                title={app.tooltip}
                              >
                                <div class="bborder bborder1">
                                  <div class="bborder bborder2">
                                    <div class="bborder bborder3">
                                      <div class="bborder bborder4"></div>
                                    </div>
                                  </div>
                                </div>
                              </a>

                              <div class="icontainer absolute" >
                                <button
                                  class="flex items-center justify-center w-25 h-25 rounded-md text-white font-semibold shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                  role="menuitem"

                                  aria-label={app.img}
                                >
                                  <img
                                    src={getAssetPath(`assets/services/${app.img}`)}
                                    alt={app.img}
                                    class={"w95icon " + (app.class ?? "")}
                                  />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}




        <svg width="0" height="0" aria-hidden="true">
          <filter id="grain-flat" color-interpolation-filters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.514"
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


        <svg width="0" height="0" aria-hidden="true">
          <filter id="icongrain" color-interpolation-filters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.514"
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
      </div>
    );
  }
}
