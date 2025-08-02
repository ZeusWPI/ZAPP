import { Component, Prop, h, State } from '@stencil/core';

const testcookiekey = 'zapptestcookie'
@Component({
  tag: 'zapp-v01',
  styleUrl: 'zapp-v01.css',
  assetsDirs: ['../assets'],
  shadow: true,
})
export class ZappV01 {
  @Prop() apps = [
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

  private getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2){
      const value = parts.pop().split(';').shift();
      return value;
    }
    else{
      console.error('cookie not found')
    }
  }

  @State() open: boolean = false;
  @State() checked: any = this.getCookie(testcookiekey) === 'true';


  private getRootDomain() {
    const hostname = window.location.hostname;

    // Handle localhost and IP addresses
    if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      return hostname;
    }

    // For regular domains, get the last two parts
    const parts = hostname.split('.');
    return parts.slice(-2).join('.');
  }

  private setCookieOnRootDomain(name, value, options) {
    const { days = 30, secure = false, sameSite = 'Lax' } = options;

    const rootDomain = this.getRootDomain();
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    let cookieString = `${name}=${value}; expires=${date.toUTCString()}; domain=.${rootDomain}; path=/; SameSite=${sameSite}`;

    if (secure) {
      cookieString += '; Secure';
    }

    document.cookie = cookieString;
  }

  private handleCheck(e) {
    this.checked = e.target.checked;
    this.setCookieOnRootDomain(testcookiekey, this.checked, { days: 30, secure: false, sameSite: 'Strict' });
  }

  render() {
    // Main container for the dropdown, centered on the screen
    return (
      <div class="relative inline-block text-left">
        {/* Main dropdown button (the orange square) */}
        <div>
          <button
            type="button"
            class="inline-flex justify-center items-center w-20 h-20 rounded-lg text-white font-bold text-xl shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
            id="menu-button"
            part='openbutton'
            aria-expanded={open}
            aria-haspopup="true"
            onClick={() => {
              this.open = !this.open;
            }}
          >
          </button>
        </div>

        {/* Dropdown panel, conditionally rendered based on 'isOpen' state */}
        {this.open && (
          <div id="dropdown">
            <div
              class="dropdown origin-top-right absolute mt-2 w-95 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              part="dropdown"
            >
              <div class="topbar" >
                <div class="button buttona">
                  ZAPP V1
                </div>
                <div class="button buttonb">CONFIG</div>
                <div class="button buttonc">LOGIN</div>
                <div class="button buttond">SOURCE</div>
                <div class="button buttonpower">⏻</div>
              </div>
              <div class="bborder bborder1" >
                <div class="dborder dborder1" >
                  <div class="dborder dborder3">
                    <div class="dborder dborder4">
                      <div class="p-4 cborder1 container">
                        <div class="noisyspectrumbg absolute inset-0 rounded-md -z-10"></div>
                        <div class="grid grid-cols-3 gap-5" role="none">
                          {this.apps.map((app, index) => (
                            <div class="w-25 h-25">
                              <button
                                class="w95in1 w-25 h-25 style absolute"
                                aria-label={app.img}
                              >
                                <div class="bborder bborder1">
                                  <div class="bborder bborder2">
                                    <div class="bborder bborder3">
                                      <div class="bborder bborder4"></div>
                                    </div>
                                  </div>
                                </div>
                              </button>
                
                              <div class="icontainer absolute" >
                                <button
                                  class="flex items-center justify-center w-25 h-25 rounded-md text-white font-semibold shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                  role="menuitem"
                                  
                                  aria-label={app.img}
                                >
                                  <img
                                    src={`assets/services/${app.img}`}
                                    alt={app.img}
                                    class="w95icon"
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
      </div>
    );
  }
}
