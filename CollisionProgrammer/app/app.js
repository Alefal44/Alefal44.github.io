const root_url = "https://electro-smith.github.io/Programmer";

var data = {
  overlayVisible: false,
  platforms: [],
  firmwares: [],
  isAccordionHovered: false,
  no_device: true,
  sel_platform: null,
  sel_firmware: null,
  firmwareFile: null,
  hoveredSVG: null,
  blinkFirmwareFile: null,
  bootloaderFirmwareFile: null,
  displayImportedFile: false,
  displaySelectedFile: false,
  accordionOpen: false,
  showWinDriverInstructions: false,
  updateButtonDisabled: false,
  showHoverDiv: false,
  isUpdateButtonVisible: true,
};

var ex_buffer;

function getRootUrl() {
  var url = document.URL;
  return url;
}

async function readServerFirmwareFile(path, dispReadme = true) {
  return new Promise((resolve) => {
    var buffer;
    var raw = new XMLHttpRequest();
    var fname = path;

    raw.open("GET", fname, true);
    raw.responseType = "arraybuffer";
    raw.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        resolve(this.response);
      }
    };
    raw.send(null);
  });
}

var app = new Vue({
  el: "#app",
  template: /* HTML */ `
    <div class="app_body">
      <nav
        class="py-6 relative z-50 flex mx-auto items-center justify-between border-b-2 border-black mb-12"
      >
        <div class="w-1/3 flex justify-start">
          <a href="#" @click="navigateBackOrRedirect" class="back-to-site">
            <div class="flex items-center">
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <h2 class="text-lg font-bold">To main site</h2>
            </div>
          </a>
        </div>

        <div class="w-1/3 flex justify-center">
          <a href="https://collisiondevices.com/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2315 307"
              aria-label="Logo of CD"
              class="w-104 h-16"
            >
              <path
                d="M187.104,173.34462 c -0.528,-0.0992 -1.67852,-0.52681 -2.55671,-0.95017 -2.63378,-1.26968 -4.46534,-3.47109 -5.33346,-6.41046 -0.5017,-1.69867 -0.4695,-4.78215 0.0682,-6.528 1.40465,-4.56105 5.28266,-7.392 10.12601,-7.392 2.65422,0 5.20429,0.94377 6.7063,2.48198 l 0.71188,0.72902 -0.76072,0.6025 c -0.4184,0.33138 -0.81597,0.6025 -0.88349,0.6025 -0.0675,0 -0.43642,-0.31364 -0.81977,-0.69699 -0.38334,-0.38335 -1.17966,-0.92335 -1.7696,-1.2 -0.96277,-0.4515 -1.2991,-0.50301 -3.28464,-0.50301 -2.1159,0 -2.26815,0.0276 -3.5031,0.63559 -1.61523,0.79518 -3.00625,2.13408 -3.75202,3.61144 -0.80467,1.59404 -1.01822,2.53117 -1.01517,4.45486 0.006,3.76027 1.76118,6.63955 4.97585,8.16253 1.19801,0.56756 1.42159,0.60758 3.39448,0.60758 1.91072,0 2.22179,-0.0512 3.264,-0.5375 0.6336,-0.29563 1.55993,-0.93795 2.05851,-1.42738 0.97314,-0.95527 1.05816,-0.96012 2.16549,-0.12354 0.37128,0.2805 0.34241,0.32969 -0.87118,1.48493 -0.69035,0.65716 -1.64904,1.37997 -2.13042,1.60624 -2.00158,0.94085 -4.46343,1.22722 -6.7904,0.78988 z m 89.184,-0.0844 c -1.29094,-0.34539 -2.91794,-1.29863 -3.66992,-2.15016 l -0.55985,-0.63397 0.53088,-0.42659 c 1.23589,-0.99307 1.08747,-0.99461 2.1038,0.0217 2.7109,2.7109 7.4362,1.84653 8.338,-1.52522 0.31868,-1.19149 0.0873,-2.15085 -0.73933,-3.06586 -0.85843,-0.95018 -1.24134,-1.15009 -4.04967,-2.11424 -2.67112,-0.91705 -3.61717,-1.43689 -4.50709,-2.47656 -0.83192,-0.97192 -1.16399,-2.12635 -1.05904,-3.68179 0.13973,-2.07098 1.21964,-3.59168 3.22822,-4.54587 0.94922,-0.45093 1.27928,-0.50152 3.264,-0.50033 1.88515,0.001 2.34613,0.0648 3.15271,0.43567 0.95271,0.43803 2.60729,1.67151 2.60729,1.94372 0,0.0809 -0.3491,0.42756 -0.77579,0.77046 l -0.77579,0.62344 -0.78141,-0.70597 c -1.06926,-0.966 -1.83647,-1.24465 -3.42701,-1.24465 -2.77984,0 -4.416,1.39703 -4.416,3.77059 0,1.98045 0.98943,2.86703 4.4927,4.02568 3.59689,1.18962 4.63004,1.8544 5.43323,3.49606 1.30823,2.67393 0.18936,6.1018 -2.42065,7.41612 -1.741,0.87672 -4.00842,1.09238 -5.96928,0.56775 z M 4.416,162.81599 v -10.176 h 4.3402859 c 4.8070951,0 5.7582991,0.14482 7.9274601,1.2069 6.348102,3.10821 7.211165,12.60978 1.532938,16.87632 -2.546495,1.9134 -4.051402,2.26878 -9.6073968,2.26878 H 4.416 Z m 9.23509,7.98542 c 2.509162,-0.76617 4.394261,-2.32665 5.415828,-4.48319 0.579338,-1.22299 0.613082,-1.41627 0.613082,-3.51152 0,-2.17677 -0.01322,-2.24405 -0.72305,-3.68095 -0.860156,-1.7412 -2.174862,-3.0287 -3.88495,-3.80458 -1.67609,-0.76045 -2.862036,-0.95318 -5.8654505,-0.95318 H 6.528 v 8.47816 8.47815 l 3.12,-0.12662 c 1.751618,-0.0711 3.507309,-0.24488 4.00309,-0.39627 z M 54.144,162.81599 v -10.176 h 6.336 6.336 v 0.864 0.864 h -5.380331 -5.380332 l 0.05233,3.504 0.05233,3.504 4.944,0.0513 4.944,0.0512 v 0.85751 0.85752 l -4.944,0.0512 -4.944,0.0512 v 3.936 3.936 l 5.52,0.051 5.52,0.0509 v 0.86106 0.86105 h -6.528 -6.528 z m 49.74578,9.744 c -0.0906,-0.2376 -0.87467,-2.2896 -1.74239,-4.56 -3.112211,-8.14313 -3.427639,-8.9692 -4.587666,-12.01457 -0.646648,-1.69762 -1.175724,-3.14913 -1.175724,-3.22558 0,-0.0765 0.490097,-0.1131 1.089105,-0.0814 l 1.089104,0.0576 3.278891,8.78334 c 1.8034,4.83083 3.3221,8.78127 3.3749,8.77875 0.0528,-0.003 1.5648,-3.97426 3.36,-8.82609 l 3.264,-8.82151 1.12454,-0.005 c 0.99361,-0.005 1.10941,0.0339 0.99453,0.33075 -0.0715,0.1848 -0.90681,2.3664 -1.85624,4.848 -0.94942,2.4816 -2.6461,6.9096 -3.7704,9.84 l -2.04418,5.328 h -1.11688 c -0.98143,0 -1.13685,-0.0524 -1.28159,-0.432 z m 40.87822,-9.744 v -10.176 h 1.056 1.056 v 10.176 10.176 h -1.056 -1.056 z m 83.712,0 v -10.176 h 6.432 6.432 v 0.864 0.864 h -5.376 -5.376 v 3.552 3.552 h 4.992 4.992 v 0.864 0.864 h -4.992 -4.992 v 4.032 4.032 h 5.472 5.472 v 0.864 0.864 h -6.528 -6.528 z M 17.568,142.55581 C 7.7618262,140.72706 1.2062653,133.5258 0.16689933,123.44077 -0.78292421,114.22458 3.5742549,105.95694 11.444428,102.04194 c 3.258286,-1.62082 5.819195,-2.22272 9.963572,-2.341756 4.675744,-0.134299 7.906128,0.503316 11.534369,2.276666 1.620754,0.79217 4.689631,3.06791 4.689631,3.47762 0,0.13064 -1.471251,1.71058 -3.269446,3.51098 l -3.269446,3.27345 -0.947196,-0.91297 c -1.878311,-1.81045 -4.408752,-2.72868 -7.489912,-2.71787 -3.347031,0.0117 -5.913087,1.06256 -8.232543,3.37132 -3.397751,3.38207 -4.4975581,8.89481 -2.794946,14.00953 1.581456,4.75077 5.879878,7.82941 10.931489,7.82941 3.041512,0 5.34689,-0.88493 7.443716,-2.8573 l 1.308649,-1.23098 0.711818,0.66643 c 0.391499,0.36653 1.946253,1.82071 3.455009,3.23151 l 2.743192,2.56509 -0.727192,0.74876 c -2.666156,2.74522 -6.841229,4.92182 -10.807192,5.63413 -1.827078,0.32816 -7.317338,0.31603 -9.12,-0.0202 z m 36.88264,-0.0163 c -4.517743,-0.81584 -8.62982,-2.97469 -11.753442,-6.17058 -6.585549,-6.73792 -7.761665,-18.84714 -2.630966,-27.08828 2.820207,-4.52994 7.063213,-7.47732 12.986649,-9.0211 1.842838,-0.480291 2.203213,-0.509022 6.275119,-0.500283 4.209482,0.009 4.377602,0.02456 6.571592,0.606693 4.10334,1.08875 7.19421,2.82886 9.947389,5.60022 2.555345,2.57222 4.223989,5.57718 5.182462,9.33278 0.594322,2.32874 0.752654,7.42848 0.309973,9.98401 -1.582813,9.13733 -8.192518,15.64866 -17.539746,17.27868 -2.092557,0.36491 -7.273673,0.35264 -9.34903,-0.0221 z m 8.33452,-9.08622 c 2.929523,-0.9096 5.530847,-3.17806 6.890455,-6.00875 3.125105,-6.50644 0.761266,-14.77234 -5.029428,-17.58697 -1.993358,-0.9689 -3.245037,-1.26025 -5.414187,-1.26025 -2.176952,0 -3.446576,0.30353 -5.335194,1.27547 -3.201071,1.64737 -5.320037,4.47907 -6.104929,8.15838 -0.341424,1.60049 -0.294372,5.06496 0.09063,6.67282 0.438653,1.83193 1.654512,4.22106 2.80515,5.51205 1.594734,1.78925 4.068976,3.18442 6.384458,3.60005 1.468221,0.26355 4.268513,0.0857 5.713049,-0.3628 z m 102.23884,9.12795 c -3.16096,-0.52592 -5.98914,-1.48321 -8.13125,-2.7523 -1.40898,-0.83474 -3.72758,-2.69598 -3.6402,-2.92213 0.0327,-0.0846 1.45862,-1.59512 3.16872,-3.35666 l 3.10927,-3.20281 1.3963,1.17238 c 1.58659,1.33216 3.52075,2.3475 5.34516,2.80596 1.61406,0.4056 4.17214,0.2856 5.38476,-0.25259 2.20353,-0.97799 3.21309,-3.59008 2.18163,-5.6446 -0.68707,-1.36853 -2.36646,-2.30004 -6.74544,-3.74151 -1.73656,-0.57164 -3.77649,-1.30886 -4.53317,-1.63827 -3.59766,-1.56619 -5.77931,-3.7561 -6.86273,-6.88872 -0.61047,-1.76511 -0.62227,-5.43686 -0.0238,-7.3941 1.29028,-4.21943 4.74624,-7.17576 10.02271,-8.57368 2.10918,-0.5588 6.8674,-0.702218 9.03775,-0.272411 2.15921,0.427601 4.1957,1.116191 5.89883,1.994551 1.54293,0.79574 3.93197,2.48674 3.84113,2.71882 -0.0317,0.0811 -1.43329,1.62635 -3.11455,3.43392 l -3.05685,3.28647 -0.99103,-0.93727 c -1.77204,-1.67592 -4.0497,-2.57354 -6.52728,-2.57238 -1.7918,8.4e-4 -2.77692,0.24033 -3.84963,0.93589 -2.01112,1.30404 -2.39672,3.8883 -0.81604,5.46898 0.84729,0.84729 1.94529,1.34698 6.11931,2.78487 4.50671,1.55249 5.40047,1.9389 7.1037,3.0712 3.72284,2.47495 5.36961,6.16826 4.8206,10.81149 -0.68483,5.79194 -4.31113,9.67856 -10.52255,11.27794 -2.34614,0.60411 -6.25504,0.77968 -8.61539,0.38696 z m 54.16264,-0.0417 c -3.55205,-0.64145 -7.27652,-2.32092 -9.97633,-4.49862 -3.55715,-2.86924 -6.20495,-7.38487 -7.25735,-12.3769 -0.32265,-1.5305 -0.32107,-7.69654 0.002,-9.216 1.80518,-8.48066 7.32881,-14.09124 15.99355,-16.2453 1.59343,-0.396125 2.25895,-0.446966 5.92313,-0.452486 4.42186,-0.0067 5.0454,0.07565 8.256,1.089876 4.36861,1.38003 8.1815,4.13537 10.54699,7.62166 2.49254,3.67353 3.6593,7.71941 3.65962,12.69025 7.4e-4,11.16529 -6.94193,19.51635 -17.79894,21.40966 -2.09256,0.36491 -7.27367,0.35264 -9.34903,-0.0221 z m 8.36992,-9.10963 c 5.41632,-1.81476 8.53808,-6.90227 8.15536,-13.29071 -0.20462,-3.4154 -1.50601,-6.31403 -3.81566,-8.49873 -2.17175,-2.05426 -4.74802,-3.04312 -7.92826,-3.04312 -3.34548,0 -5.82998,1.01278 -8.1817,3.33519 -1.59454,1.57465 -2.5471,3.24367 -3.18331,5.57755 -0.46303,1.69862 -0.4661,5.56351 -0.006,7.28993 1.27438,4.77958 4.79497,8.21984 9.22935,9.01876 1.50536,0.27121 4.33257,0.0793 5.73,-0.38887 z M 85.443523,121.248 V 100.8 H 90.433761 95.424 v 16.224 16.22399 h 7.968 7.968 v 4.224 4.224 H 98.401761 85.443523 Z m 27.836477,0 V 100.8 h 4.992 4.992 v 16.224 16.22399 h 7.92 7.92 v 4.224 4.224 H 126.192 113.28 Z m 27.648,0 V 100.8 h 4.992 4.992 v 20.448 20.44799 h -4.992 -4.992 z m 47.04,0 V 100.8 h 4.992 4.992 v 20.448 20.44799 h -4.992 -4.992 z m 62.208,0 V 100.8 h 5.72168 5.72167 l 8.00791,13.02147 c 4.40435,7.16181 8.14277,13.18821 8.30759,13.392 0.272,0.33631 0.28953,-0.86618 0.18981,-13.02147 L 278.0148,100.8 h 4.8006 4.8006 v 20.448 20.44799 h -5.64821 -5.64822 l -3.82154,-6.192 c -2.10184,-3.4056 -5.80255,-9.41021 -8.22378,-13.34359 -2.42124,-3.93338 -4.45435,-7.15178 -4.51804,-7.152 -0.0637,-2.2e-4 -0.073,6.0044 -0.0207,13.34359 l 0.0951,13.344 h -4.82733 -4.82733 z m 4.992,-29.105299 c -17.93855,-0.194101 -17.43089,-0.174565 -18.16762,-0.699163 -0.99933,-0.711586 -1.15912,-1.379163 -0.76582,-3.199408 1.40499,-6.502388 1.58475,-13.221105 0.49679,-18.568112 -1.13803,-5.593052 -3.5756,-10.093757 -7.54821,-13.936946 -4.25871,-4.119963 -9.77109,-6.92412 -16.15914,-8.220182 -3.7526,-0.76136 -5.23057,-0.880881 -12.288,-0.993718 -7.51115,-0.12009 -7.80199,-0.08169 -8.53908,1.127272 -0.38201,0.626582 -0.38765,0.922862 -0.39904,20.987553 -0.009,15.242612 -0.0691,20.519037 -0.24072,21.017351 -0.13085,0.379916 -0.50873,0.853327 -0.88084,1.103522 l -0.65169,0.438171 -15.86031,-0.116519 C 165.44114,91.018436 155.34638,90.910651 151.73151,90.843 l -6.57249,-0.123004 -0.62751,-0.627683 -0.62751,-0.627684 -0.0493,-41.667345 c -0.0545,-46.0710059 -0.15346,-42.3946032 1.16261,-43.1970572 0.6024,-0.3673046 1.18808,-0.3748001 29.31868,-0.3752199 16.86447,-2.517e-4 30.36708,0.080766 32.736,0.1964211 16.2111,0.7914551 30.48444,3.607256 40.94408,8.07732 5.13128,2.192922 10.99274,5.556523 15.11992,8.676581 10.03473,7.58603 17.91766,19.011106 21.51704,31.185579 3.01898,10.211326 4.01567,23.584908 2.65776,35.662025 -0.32894,2.925606 -0.56457,3.597253 -1.41652,4.037813 -0.64065,0.331298 -6.28981,0.346366 -30.72628,0.08196 z M 3.0777629,91.733606 C 2.8169326,91.595444 2.397676,91.181261 2.1460817,90.813199 L 1.6886375,90.143996 1.7891058,80.831997 c 0.093399,-8.656775 0.2527111,-11.680884 0.7940033,-15.072 0.067424,-0.4224 0.2119493,-1.3296 0.3211678,-2.016 C 5.1016914,49.934017 11.349339,36.687277 20.652904,26.111999 30.434172,14.99372 43.800193,6.9815048 59.36321,2.9072392 c 14.709455,-3.85081041 31.579612,-3.82639174 46.89416,0.067877 11.72377,2.9811842 22.36876,8.071224 30.81962,14.736796 1.88339,1.485508 2.31258,2.057655 2.314,3.08471 0.001,0.895974 -0.19263,1.27523 -1.34306,2.627377 -0.49415,0.5808 -2.83,3.3888 -5.19078,6.24 -2.36079,2.8512 -5.51157,6.6528 -7.00174,8.447999 -1.49017,1.7952 -4.85769,5.856 -7.48337,9.024 -2.62568,3.168 -5.28938,6.37793 -5.91934,7.133178 -1.21381,1.455241 -1.71526,1.794822 -2.65036,1.794822 -0.825,0 -1.21832,-0.253756 -3.00169,-1.936558 -4.7173,-4.451273 -10.901402,-7.032354 -18.409479,-7.683625 -9.34348,-0.810479 -17.915199,2.113791 -23.975171,8.179209 -4.645048,4.649222 -7.584666,10.681579 -8.655071,17.760973 -0.598217,3.956465 -0.292886,10.246625 0.708499,14.595857 0.237292,1.030613 0.35334,2.001154 0.283678,2.372484 -0.12536,0.668224 -0.916682,1.543395 -1.553106,1.717672 -0.601177,0.164625 -8.771169,0.307592 -23.808,0.416616 -13.083727,0.09486 -16.897448,0.156348 -24.576,0.39622 -2.4814681,0.07752 -3.3776966,0.04174 -3.7382371,-0.14924 z"
              />
            </svg>
          </a>
        </div>

        <div class="w-1/3 flex justify-end ">
          <div class="flex  items-center  text-center relative gap-x-2">
            <p class="font-bold">Instructions:</p>
            <div class="flex justify-center items-end gap-x-2">
              <svg
                @mouseover="hoveredSVG = 'svg1'"
                @mouseleave="hoveredSVG = null"
                fill="#000000"
                viewBox="-3.5 -2 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
                class="w-8 h-8"
              >
                <path
                  d="M13.623 10.627c-.025-2.533 2.066-3.748 2.159-3.808-1.175-1.72-3.005-1.955-3.657-1.982-1.557-.158-3.039.917-3.83.917-.788 0-2.008-.894-3.3-.87C3.299 4.909 1.734 5.87.86 7.39c-1.764 3.06-.452 7.595 1.267 10.077.84 1.215 1.842 2.58 3.157 2.53 1.266-.05 1.745-.819 3.276-.819 1.531 0 1.962.82 3.302.795 1.363-.026 2.226-1.239 3.06-2.457.965-1.41 1.362-2.775 1.386-2.845-.03-.013-2.658-1.02-2.684-4.045zm-2.518-7.433c.698-.847 1.169-2.022 1.04-3.194C11.14.04 9.921.67 9.2 1.515c-.647.75-1.214 1.945-1.062 3.094 1.122.088 2.268-.57 2.967-1.415z"
                />
              </svg>
              <svg
                @mouseover="hoveredSVG = 'svg2'"
                @mouseleave="hoveredSVG = null"
                fill="#000000"
                viewBox="0 0 14 14"
                role="img"
                focusable="false"
                aria-hidden="true"
                class="w-7 h-7"
              >
                <path
                  d="M 7.251852,7.25185 13,7.25185 13,13 7.251852,13 Z m -6.251852,0 5.748148,0 0,5.74815 L 1,13 Z M 7.251852,1 13,1 l 0,5.74815 -5.748148,0 z M 1,1 l 5.748148,0 0,5.74815 -5.748148,0 z"
                />
              </svg>
            </div>
            <transition name="fade">
              <div
                v-if="hoveredSVG === 'svg1'"
                @mouseover="hoveredSVG = 'svg1'"
                @mouseleave="hoveredSVG = null"
                class="transition-opacity duration-500 absolute top-10 right-10  mac-instructions instructions shadow-2xl text-left"
              >
                <p class="font-bold pb-2 text-xl">Mac:</p>
                <p class="italic font-bold text-sm">
                  <span class="bg-red-400 text-white px-2">Note:</span> Your
                  pedal may be damaged by uploading incorrect firmware.
                </p>
                <ol class="list-inside space-y-3 pt-4 text-sm">
                  <li>Select your pedal and version from the dropdown menu.</li>
                  <li>
                    <strong>*</strong>Connect your pedal using a data transfer
                    micro USB cable.
                  </li>
                  <li>
                    <strong>*</strong>Connect appropriate pedal power supply
                    (refer to manual for current requirements).
                  </li>
                  <li>
                    Click the Connect button. A pop-up will appear in your
                    browser – select “DFU in FS mode” and click Connect.
                  </li>
                  <li>Click the Update button.</li>
                </ol>
                <p class="block pt-4 italic font-bold text-sm">
                  <strong>*</strong>Steps 2 and 3 must be performed in this
                  order.
                </p>
              </div>
              <div
                v-if="hoveredSVG === 'svg2'"
                @mouseover="hoveredSVG = 'svg2'"
                @mouseleave="hoveredSVG = null"
                class="transition-opacity duration-500 absolute top-10 right-1 instructions shadow-2xl text-left"
              >
                <p class="font-bold pb-2 text-xl">Windows:</p>
                <p class="italic font-bold text-sm">
                  <span class="bg-red-400 text-white px-2">Note:</span>Your
                  pedal may be damaged by uploading incorrect firmware.
                </p>
                <ol class="list-inside space-y-3 pt-4 text-sm">
                  <li>
                    Install the Windows driver (first time only, see below).
                  </li>
                  <li>Select your pedal and version from the dropdown menu.</li>
                  <li>
                    <strong>*</strong>Connect your pedal using a data transfer
                    micro USB cable.
                  </li>
                  <li>
                    <strong>*</strong>Connect appropriate pedal power supply
                    (refer to manual for current requirements).
                  </li>
                  <li>
                    Click the Connect button. A pop-up will appear in your
                    browser – select “DFU in FS mode” and click Connect.
                  </li>
                  <li>Click the Update button.</li>
                </ol>
                <p class="block pt-4 italic font-bold text-sm">
                  <strong>*</strong>Steps 3 and 4 must be performed in this
                  order.
                </p>
                <div class="">
                  <button
                    @click="toggleWinDriverInstructions"
                    class="w-full font-bold p-0 mt-6 cursor-pointer border-none flex"
                  >
                    Windows Driver Install
                    <svg
                      :class="{'rotate-180': showWinDriverInstructions}"
                      class="fill-current h-6 w-6 transform transition-transform duration-150 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>

                  <transition name="fade">
                    <ol
                      v-if="showWinDriverInstructions"
                      class="space-y-3 text-sm win-driver mt-2"
                    >
                      <video src="assets/zadig-install.mp4" controls />
                      <li>
                        Download
                        <a
                          href="https://zadig.akeo.ie/"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-blue-500 hover:underline"
                        >
                          Zadig
                        </a>
                        and open the program.
                      </li>
                      <li>
                        Connect your pedal using steps 2 and 3 above (in order).
                      </li>
                      <li>
                        Click Options > List All Devices > select “DFU in FS
                        Mode”.
                      </li>
                      <li>Click “Upgrade Driver”.</li>
                    </ol>
                  </transition>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </nav>

      <div
        v-if="!isChromiumBasedBrowser"
        class="warning absolute top-2 right-0 left-0 w-96 z-100 mx-auto p-4 bg-red-500 text-white text-left shadow-2xl  space-y-4"
      >
        <h3 class="text-2xl font-semibold text-center">Browser Warning</h3>
        <p>This interface only works on Google Chrome or Microsoft Edge.</p>
        <p>Please use one of these browsers for the best experience.</p>
      </div>
      <div
        class="mt-8 text-red-500 font-semibold border-black border-2 w-72 p-4 mx-auto shadow-xl text-left"
        id="mobileWarning"
      >
        <h2 class="text-2xl font-semibold bg-red-500 text-white px-2 mb-4">
          Browser Warning:
        </h2>
        <p class="pb-2">This app is not optimized for mobile devices.</p>
        <p>Please use a Chrome or Edge browser on a desktop computer.</p>
      </div>

      <div class="flex flex-col items-center">
        <div>
          <h1 class="h1 shadow">Collision Devices Firmware Updater</h1>
        </div>
        <!--
        <div class="relative flex justify-center">
          <img
            src="assets/binaryV2.svg"
            alt="Binary Image"
            style="width: 650px"
            class="py-2 z-20 transition-opacity duration-300"
            :style="{ opacity: overlayVisible ? '2' : '1' }"
          />
        </div>
        -->
        */
        <div
          class="flex pb-2 items-center justify-center w-96 relative flex-col "
        >
          <transition name="fade">
            <div
              v-show="overlayVisible"
              class="info flex-col absolute bottom-12 h-full flex justify-center items-center pb-2"
              id="downloadLog"
            />
          </transition>
          <!--          <div-->
          <!--            id="downloadLog"-->
          <!--            class="info flex-col absolute bottom-12 h-full flex justify-center items-center pb-2"-->
          <!--          >-->
          <!--            <progress id="progress" value="71680" max="129112"></progress>-->
          <!--            <p class="bg-white relative z-50 install-btn">Preparing......</p>-->
          <!--          </div>-->
          <div
            class="accordion-parent w-96 py-3 px-3 border-black border-2 cursor-pointer flex justify-between items-center"
            @click="toggleAccordion"
            @mouseenter="handleAccordionMouseEnter"
            @mouseleave="handleAccordionMouseLeave"
            :class="{'shadow-xl': isAccordionHovered || sel_firmware}"
          >
            {{ sel_firmware ? sel_firmware.name : 'Select Pedal...' }}
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
            >
              <path
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-4.293-1.707a1 1 0 00-1.414 0L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
                fill="#ba8e51"
              />
            </svg>
          </div>

          <!-- Accordion Dropdown -->
          <transition name="accordion">
            <div
              v-if="accordionOpen"
              key="content"
              class="absolute z-10 w-96 accordion-dropdown"
              style="background-color: #fefbf6; top: 100%; box-sizing: border-box; border: 2px solid black; "
            >
              <div
                class="flex flex-col text-left divide-y divide-black shadow "
              >
                <div
                  v-for="(firmware, index) in platformFirmwares"
                  :key="index"
                  class="py-3 px-4 a-file cursor-pointer font-bold"
                  @click="selectfirmware(firmware)"
                  @mouseenter="hoverEnter($event, firmware.bgColor)"
                  @mouseleave="hoverLeave($event)"
                >
                  <p>{{ firmware.name }}</p>
                </div>
              </div>
            </div>
          </transition>
          <!--          <div class="relative">-->
          <!--            <svg-->
          <!--              viewBox="0 0 32 32"-->
          <!--              class="ml-2 w-8 h-8"-->
          <!--              @mouseover="showHoverDiv = true"-->
          <!--              @mouseleave="showHoverDiv = false"-->
          <!--            >-->
          <!--              <rect x="15" y="14" width="2" height="8" />-->
          <!--              <rect x="15" y="10" width="2" height="2" />-->
          <!--              <circle-->
          <!--                fill="none"-->
          <!--                stroke="#000000"-->
          <!--                stroke-width="2"-->
          <!--                stroke-miterlimit="10"-->
          <!--                cx="16"-->
          <!--                cy="16"-->
          <!--                r="12"-->
          <!--              />-->
          <!--            </svg>-->

          <!--            &lt;!&ndash; Conditional div &ndash;&gt;-->
          <!--            <div-->
          <!--              v-show="showHoverDiv"-->
          <!--              class="changelog absolute z-10 bg-white shadow-md p-4 bottom-10 z-50 -left-40 w-96 border-2 border-black"-->
          <!--            >-->
          <!--              <p>-->
          <!--                * Includes three new amp models built from the ground up using a-->
          <!--                detailed physical modelling based simulation of the original-->
          <!--                circuity.-->
          <!--              </p>-->
          <!--              <p>-->
          <!--                * Includes six new IRs meticulously designed by Tone Factor that-->
          <!--                were captured with vintage and era specific amps, matching the-->
          <!--                ACS1's amp models.-->
          <!--              </p>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <p>
          <button
            variant="es"
            id="connect"
            class="mt-4"
            :class="{'button-shadow': sel_firmware, 'button-no-shadow': !sel_firmware, 'opacity-40': !sel_firmware}"
            :disabled="!sel_firmware"
          >
            Connect
          </button>
        </p>
        <button
          id="download"
          variant="es"
          :class="['mt-4 paper', {'text-green-500 border-green-500 button-shadow': !no_device && sel_firmware, 'button-no-shadow opacity-40 cursor-not-allowed text-black border-black': no_device || !sel_firmware}]"
          :disabled="no_device || !sel_firmware || updateButtonDisabled"
          @click="showOverlay"
          v-if="isUpdateButtonVisible"
        >
          Update
        </button>
      </div>

      <div v-if="sel_firmware||firmwareFile">
        <div v-if="displaySelectedFile">
          <!--            <h3 class="info">Name: {{sel_firmware.name}}</h3>-->
          <!--            <li>Description: {{sel_firmware.description}}</li>-->
          <!--            <h3 class="info">File Location: {{sel_firmware.filepath}}</h3>-->
        </div>
      </div>
      <!-- HIDDEN -->
      <div hidden>
        <button id="detach" disabled hidden>Detach DFU</button>
        <button id="upload" disabled hidden>Upload</button>
        <b-form-select
          placeholder="Platform"
          v-model="sel_platform"
          textContent="Select a platform"
          id="platformSelector"
          hidden
        >
          <template v-slot:first>
            <b-form-select-option :value="null" disabled
              >-- Platform --</b-form-select-option
            >
          </template>
          <option v-for="platform in platforms" :value="platform">
            {{platform}}
          </option>
        </b-form-select>
        <form id="configForm" hidden>
          <p>
            <label for="transferSize" hidden="true">Transfer Size:</label>
            <input
              type="number"
              name="transferSize"
              hidden="true"
              id="transferSize"
              value="1024"
            />
          </p>
          <p><span id="status"></span></p>

          <p>
            <label hidden="true" for="vid">Vendor ID (hex):</label>
            <input
              hidden="true"
              list="vendor_ids"
              type="text"
              name="vid"
              id="vid"
              maxlength="6"
              size="8"
              pattern="0x[A-Fa-f0-9]{1,4}"
            />
            <datalist id="vendor_ids"> </datalist>
          </p>

          <div id="dfuseFields" hidden="true">
            <label for="dfuseStartAddress" hidden="true"
              >DfuSe Start Address:</label
            >
            <input
              type="text"
              name="dfuseStartAddress"
              id="dfuseStartAddress"
              hidden="true"
              title="Initial memory address to read/write from (hex)"
              size="10"
              pattern="0x[A-Fa-f0-9]+"
            />
            <label for="dfuseUploadSize" hidden="true"
              >DfuSe Upload Size:</label
            >
            <input
              type="number"
              name="dfuseUploadSize"
              id="dfuseUploadSize"
              min="1"
              max="2097152"
              hidden="true"
            />
          </div>
        </form>
        <div hidden>
          <legend>Getting Started? Flash the Blink firmware!</legend>
          <button variant="es" id="blink" :disabled="no_device">
            Flash Blink!
          </button>
          <legend>Or select a file from your computer</legend>
          <b-form-file
            id="firmwareFile"
            v-model="firmwareFile"
            :state="Boolean(firmwareFile)"
            placeholder="Choose or drop a file..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        </div>
        <div id="usbInfo" hidden="true" style="white-space: pre"></div>
        <div id="dfuInfo" hidden="true" style="white-space: pre"></div>
        <button hidden variant="es" v-b-toggle.collapseAdvanced>
          Advanced...
        </button>

        <button hidden variant="es" id="bootloader" :disabled="no_device">
          Flash Bootloader Image
        </button>
        <div id="readme"></div>
        {{console.log(this.configFormValid)}}
      </div>
    </div>
  `,
  data: data,
  computed: {
    isChromiumBasedBrowser() {
      return (
        /Chrome/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent)
      );
    },
    platformFirmwares: function () {
      return this.firmwares.filter(
        (firmware) =>
          firmware.platform === this.sel_platform && firmware.active,
      );
    },
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside, true);
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside, true);
    this.sel_platform = "models";
    var self = this;
    this.importfirmwares();
  },
  methods: {
    toggleWinDriverInstructions() {
      this.showWinDriverInstructions = !this.showWinDriverInstructions;
    },
    updateProgressColor(bgColor) {
      const styleElement = document.createElement("style");
      styleElement.type = "text/css";
      const cssRules = /* HTML */ `
        progress::-webkit-progress-value { background-color: ${bgColor} }
      `;

      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = cssRules; // Support for IE
      } else {
        styleElement.appendChild(document.createTextNode(cssRules));
      }

      // Remove the existing custom style for progress if it exists to prevent duplicates
      const existingStyle = document.getElementById("dynamic-progress-style");
      if (existingStyle) {
        existingStyle.parentNode.removeChild(existingStyle);
      }

      // Add an ID to the style element to make it easier to find and remove later if needed
      styleElement.id = "dynamic-progress-style";

      // Append the new style element to the <head> of the document
      document.head.appendChild(styleElement);
    },
    hoverEnter(event, bgColor) {
      event.target.style.backgroundColor = bgColor;
    },

    hoverLeave(event) {
      event.target.style.backgroundColor = ""; // Reset to default or you can set it to another color
    },
    showOverlay() {
      this.updateButtonDisabled = true;
      this.isUpdateButtonVisible = false; // Hide the update button
      this.overlayVisible = true;

      setTimeout(() => {
        this.updateButtonDisabled = false;
      }, 18000);
    },
    handleAccordionMouseEnter() {
      this.isAccordionHovered = true;
    },
    handleAccordionMouseLeave() {
      this.isAccordionHovered = false;
    },
    handleClickOutside(event) {
      const accordion = this.$el.querySelector(".accordion-parent");
      if (
        accordion &&
        !accordion.contains(event.target) &&
        this.accordionOpen
      ) {
        this.closeAccordion();
      }
    },
    selectfirmware(firmware) {
      this.sel_firmware = firmware;
      this.closeAccordion();
      this.programChanged();
    },
    toggleAccordion() {
      this.accordionOpen = !this.accordionOpen;
    },
    closeAccordion() {
      this.accordionOpen = false;
    },
    navigateBackOrRedirect() {
      if (document.referrer.includes("https://chasebliss.com")) {
        window.history.back();
      } else {
        window.location.href = "https://chasebliss.com";
      }
    },
    importfirmwares() {
      var self = this;
      var src_url = getRootUrl().split("?")[0].concat("data/sources.json"); //need to strip out query string
      var raw = new XMLHttpRequest();
      raw.open("GET", src_url, true);
      raw.responseType = "text";
      raw.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          var obj = this.response;
          buffer = JSON.parse(obj);
          buffer.forEach(function (ex_src) {
            var ext_raw = new XMLHttpRequest();
            ext_raw.open("GET", ex_src.data_url, true);
            ext_raw.responseType = "text";
            ext_raw.onreadystatechange = function () {
              if (this.readyState === 4 && this.status === 200) {
                var ext_obj = this.response;
                ex_buffer = JSON.parse(ext_obj);
                const unique_platforms = [
                  ...new Set(ex_buffer.map((obj) => obj.platform)),
                ];
                ex_buffer.forEach(function (ex_dat) {
                  ex_dat.source = ex_src;

                  self.firmwares.sort(function (i1, i2) {
                    return i1.name.toLowerCase() < i2.name.toLowerCase()
                      ? -1
                      : 1;
                  });
                  self.firmwares.push(ex_dat);
                });
                unique_platforms.forEach(function (u_plat) {
                  if (!self.platforms.includes(u_plat)) {
                    self.platforms.push(u_plat);
                  }
                });
              }
            };
            ext_raw.send(null);
          });
        }
      };
      raw.send(null);
    },
    programChanged() {
      var self = this;
      self.firmwareFileName = self.sel_firmware.name;
      this.displaySelectedFile = true;
      var srcurl = self.sel_firmware.source.repo_url;
      var expath = srcurl.concat(self.sel_firmware.filepath);
      readServerFirmwareFile(expath).then((buffer) => {
        firmwareFile = buffer;
      });
    },
  },
  watch: {
    "sel_firmware.bgColor"(newColor, oldColor) {
      if (this.overlayVisible && newColor) {
        this.updateProgressColor(newColor);
      }
    },
    overlayVisible(newVal) {
      // When the overlay becomes visible, update the progress bar color if sel_firmware.bgColor is available
      if (newVal && this.sel_firmware && this.sel_firmware.bgColor) {
        this.updateProgressColor(this.sel_firmware.bgColor);
      }
    },
    firmwareFile(newfile) {
      firmwareFile = null;
      this.displaySelectedFile = true;
      var new_firmware = {
        name: newfile.name,
        description: "Imported File",
        filepath: null,
        platform: null,
      };
      this.sel_firmware = new_firmware;
      let reader = new FileReader();
      reader.onload = function () {
        this.firmwareFile = reader.result;
        firmwareFile = reader.result;
      };
      reader.readAsArrayBuffer(newfile);
    },
    firmwares() {
      var self = this;

      var searchParams = new URLSearchParams(getRootUrl().split("?")[1]);
      var platform = searchParams.get("platform");
      var name = searchParams.get("name");
      if (
        platform != null &&
        self.firmwares.filter((ex) => ex.platform === platform)
      ) {
        self.sel_platform = platform;

        if (name != null) {
          var ex = self.firmwares.filter(
            (ex) => ex.name === name && ex.platform === platform,
          )[0];
          if (ex != null) {
            self.sel_firmware = ex;
            this.programChanged();
          }
        }
      }
    },
  },
});