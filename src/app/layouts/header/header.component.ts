import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CategoryModel } from '../../shared/models';
import { BaseService } from '../../shared/base.service';
import * as $ from 'jquery'
import { isPlatformBrowser } from '@angular/common';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

	categories: CategoryModel[];
	isUser: boolean = false;
	isMobile: boolean = false;

	constructor(private baseService: BaseService, @Inject(PLATFORM_ID) private platformId: any) {

	}

	ngOnInit(): void {

		if (isPlatformBrowser(this.platformId)) {
			var MqL = 1170;
			//move nav element position according to window width
			moveNavigation();
			$(window).on('resize', function () {
				(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
			});

			//mobile - open lateral menu clicking on the menu icon
			$('.cd-nav-trigger').on('click', function (event) {
				event.preventDefault();
				if ($('.cd-main-content').hasClass('nav-is-visible')) {
					closeNav();
					$('.cd-overlay').removeClass('is-visible');
				} else {
					$(this).addClass('nav-is-visible');
					$('.cd-primary-nav').addClass('nav-is-visible');
					$('.cd-main-header').addClass('nav-is-visible');
					$('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
						$('body').addClass('overflow-hidden');
					});
					toggleSearch('close');
					$('.cd-overlay').addClass('is-visible');
				}
			});

			//open search form
			$('.cd-search-trigger').on('click', function (event) {
				event.preventDefault();
				toggleSearch('');
				closeNav();
			});

			//close lateral menu on mobile 
			$('.cd-overlay').on('swiperight', function () {
				if ($('.cd-primary-nav').hasClass('nav-is-visible')) {
					closeNav();
					$('.cd-overlay').removeClass('is-visible');
				}
			});
			$('.nav-on-left .cd-overlay').on('swipeleft', function () {
				if ($('.cd-primary-nav').hasClass('nav-is-visible')) {
					closeNav();
					$('.cd-overlay').removeClass('is-visible');
				}
			});
			$('.cd-overlay').on('click', function () {
				closeNav();
				toggleSearch('close')
				$('.cd-overlay').removeClass('is-visible');
			});


			//prevent default clicking on direct children of .cd-primary-nav 
			$('.cd-primary-nav').children('.has-children').children('a').on('click', function (event) {
				event.preventDefault();
			});
			//open submenu
			$('.has-children').children('a').on('click', function (event) {
				if (!checkWindowWidth()) event.preventDefault();
				var selected = $(this);
				$('.cd-secondary-nav').scrollTop(0);
				if (selected.next('ul').hasClass('is-hidden')) {
					//desktop version only
					selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
					selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
					$('.cd-overlay').addClass('is-visible');
				} else {
					selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
					$('.cd-overlay').removeClass('is-visible');
				}
				toggleSearch('close');
			});

			//submenu items - go back link
			$('.go-back').on('click', function () {
				$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
			});

			// $('.animsition-link').on('click', function(){
			// 	$('.has-children').children('a').removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
			// 	$('.cd-overlay').removeClass('is-visible');
			// });

			function closeNav() {
				$('.cd-nav-trigger').removeClass('nav-is-visible');
				$('.cd-main-header').removeClass('nav-is-visible');
				$('.cd-primary-nav').removeClass('nav-is-visible');
				$('.has-children ul').addClass('is-hidden');
				$('.has-children a').removeClass('selected');
				$('.moves-out').removeClass('moves-out');
				$('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
					$('body').removeClass('overflow-hidden');
				});
			}

			function toggleSearch(type) {
				if (type == "close") {
					//close serach 
					$('.cd-search').removeClass('is-visible');
					$('.cd-search-trigger').removeClass('search-is-visible');
				} else {
					//toggle search visibility
					$('.cd-search').toggleClass('is-visible');
					$('.cd-search-trigger').toggleClass('search-is-visible');
					if ($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
					($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible');
				}
			}

			function checkWindowWidth() {
				//check window width (scrollbar included)
				let e = window,
					a = 'inner';
				if (!('innerWidth' in window)) {
					a = 'client';
					// @ts-ignore
					e = document.documentElement || document.body;
				}
				if (e[a + 'Width'] >= MqL) {
					return true;
				} else {
					return false;
				}
			}

			function moveNavigation() {
				var navigation = $('.cd-nav');
				var desktop = checkWindowWidth();
				if (desktop) {
					navigation.detach();
					navigation.insertBefore('.cd-header-buttons');
				} else {
					navigation.detach();
					navigation.insertAfter('.cd-main-content');
				}
			}

			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				$('.animsition-link').on('click', function (event) {
					event.preventDefault();
					if ($('.cd-main-content').hasClass('nav-is-visible')) {
						closeNav();
						$('.cd-overlay').removeClass('is-visible');
					} else {
						$('.cd-nav-trigger').addClass('nav-is-visible');
						$('.cd-primary-nav').addClass('nav-is-visible');
						$('.cd-main-header').addClass('nav-is-visible');
						$('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
							$('body').addClass('overflow-hidden');
						});
						toggleSearch('close');
						$('.cd-overlay').addClass('is-visible');
					}
				});
			} else {
				$('.animsition-link').on('click', function () {
					$('.has-children').children('a').removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
					$('.cd-overlay').removeClass('is-visible');
				});
			}
			// let $categoryListObservable = this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList");
			// const getAllCategoryListDataKey = makeStateKey("GetAllCategoryList");

			// this.subscription = this.baseService.getCachedObservable<CategoryModel[]>($categoryListObservable, getAllCategoryListDataKey).subscribe(data => {
			// 	this.categories = data;
			// });

		}

		if (localStorage.getItem('currentUser')) {
			this.isUser = true;
		}
	}

}
