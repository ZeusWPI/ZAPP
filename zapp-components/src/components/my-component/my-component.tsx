import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  @State() open: boolean = false;



  // Function to toggle the dropdown's open/closed state
  toggleDropdown = () => {
    this.open = !this.open;
  };

  render() {
    // Main container for the dropdown, centered on the screen
    return <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div class="relative inline-block text-left">
        {/* Main dropdown button (the orange square) */}
        <div>
          <button
            type="button"
            class="inline-flex justify-center items-center w-20 h-20 rounded-lg bg-orange-500 text-white font-bold text-xl shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
            id="menu-button"
            aria-expanded={open}
            aria-haspopup="true"
            onClick={()=>{this.open = !this.open; console.log("clicked, now " + this.open)}}
          >
            Zapp
          </button>
        </div>

        {/* Dropdown panel, conditionally rendered based on 'isOpen' state */}
        {this.open && (
          <div
            class="origin-top-right absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-4"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            {/* Grid container for the 9 square buttons */}
            <div class="grid grid-cols-3 gap-2" role="none">
              {/* Generate 9 square buttons */}
              {[...Array(9)].map((_, index) => (
                <button
                  key={index}
                  class="flex items-center justify-center w-16 h-16 rounded-md bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  role="menuitem"
                  // You can add an onClick handler here for each button, e.g., to perform an action or close the dropdown
                  onClick={() => {
                    console.log(`Button ${index + 1} clicked!`);
                    // Optionally close the dropdown after a button is clicked
                    // setIsOpen(false);
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  }
}
