import { Component, Prop, h, State } from '@stencil/core';

const testcookiekey = 'zapptestcookie'
@Component({
  tag: 'zapp-v01',
  styleUrl: 'zapp-v01.css',
  assetsDirs: ['../assets'],
  shadow: true,
})
export class ZappV01 {
  @Prop() apps: string = 'tap,zauth,tab,zout,mattermost,git,haldis,gamification,zess,events,pix,zinc';

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
          <div
            class="origin-top-right absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-4"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            part="dropdown"
          >
            <div class="font-semibold text-xl" part="cookiesim">
              <input onInput={e => this.handleCheck(e)} class="m-4 w-6 h-6" type="checkbox" checked={this.checked}/>
              cookie simulator
            </div>
            {/* Grid container for the 9 square buttons */}
            <div class="grid grid-cols-3 gap-2" role="none">
              {/* Generate 9 square buttons */}
              {this.apps.split(',').map((app, index) => (
                <button
                  key={index}
                  class="flex items-center justify-center w-16 h-16 rounded-md bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  role="menuitem"
                  // You can add an onClick handler here for each button, e.g., to perform an action or close the dropdown
                  onClick={() => {
                    console.log(`${app} button clicked!`);
                    // Optionally close the dropdown after a button is clicked
                    // setIsOpen(false);
                  }}
                >
                  {app}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
