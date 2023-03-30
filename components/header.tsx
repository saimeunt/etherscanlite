'use client';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIsClient } from 'usehooks-ts';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useAccount, useDisconnect } from 'wagmi';
import { Web3Button } from '@web3modal/react';

const Header = () => {
  const pathname = usePathname();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const isClient = useIsClient();
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="block h-8 w-auto lg:hidden"
                    src="/img/etherscan-logo.png"
                    alt="Etherscan logo circle"
                    width={543}
                    height={122}
                  />
                  <Image
                    className="hidden h-8 w-auto lg:block"
                    src="/img/etherscan-logo.png"
                    alt="Etherscan logo circle"
                    width={543}
                    height={122}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className={classNames(
                      {
                        'border-indigo-500 text-gray-900': pathname === '/',
                        'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                          pathname !== '/',
                      },
                      'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900',
                    )}
                  >
                    Home
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isClient && isConnected ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={`https://effigy.im/a/${address}.png`}
                          alt="Account avatar"
                          width={32}
                          height={32}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={`/address/${address}`}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              Your Account
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => disconnect()}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              Disconnect
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Web3Button />
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              <Disclosure.Button
                as={Link}
                href="/"
                className={classNames(
                  {
                    'border-indigo-500 bg-indigo-50 text-indigo-700': pathname !== '/',
                    'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700':
                      pathname !== '/',
                  },
                  'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                )}
              >
                Home
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
