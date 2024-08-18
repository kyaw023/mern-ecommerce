import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const FooterComponent = () => {
  return (
    <footer className="bg-light-background dark:bg-dark-background border-t border-light-accent dark:border-dark-accent">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="md:flex md:justify-between">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
              Company name
            </h3>
            <p className="mt-2 text-light-text dark:text-dark-text">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="mt-4 flex space-x-6">
              <a
                href="#"
                className="text-light-text dark:text-dark-text hover:text-primary"
              >
                {/* Facebook Icon */}
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-light-text dark:text-dark-text hover:text-primary"
              >
                {/* Instagram Icon */}
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-light-text dark:text-dark-text hover:text-primary"
              >
                {/* Twitter Icon */}
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-light-text dark:text-dark-text hover:text-primary"
              >
                {/* GitHub Icon */}
                <FaGithub size={20} />
              </a>
              <a
                href="#"
                className="text-light-text dark:text-dark-text hover:text-primary"
              >
                {/* YouTube Icon */}
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-light-text dark:text-dark-text">
                Solutions
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Commerce
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Insights
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-light-text dark:text-dark-text">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    API Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-light-text dark:text-dark-text">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-light-text dark:text-dark-text">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Claim
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light-text dark:text-dark-text hover:text-primary"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-light-accent dark:border-dark-accent mt-12 pt-8 text-center text-light-text dark:text-dark-text">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
