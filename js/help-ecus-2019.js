$(document).ready(function(){
 $('#slidebar').css('height', window.innerHeight - 52);
        $('#KhungHT').css('height', window.innerHeight - 52);
        $('.right-content').css('max-height', window.innerHeight - 110);
        setTimeout(function () { $('table').css('border-style', "none"); }, 500);
        $.fn.extend({
            treed: function (o) {
                var openedClass = 'glyphicon-triangle-bottom', openedClassAfter = "glyphicon-folder-open";
                var closedClass = 'glyphicon-triangle-right', closedClassAfter = 'glyphicon-folder-close';
                if (typeof o != 'undefined') {
                    if (typeof o.openedClass != 'undefined') {
                        openedClass = o.openedClass;
                    }
                    if (typeof o.closedClass != 'undefined') {
                        closedClass = o.closedClass;
                    }
                };
                //initialize each of the top levels
                var tree = $(this);
                tree.addClass("tree");
                tree.find('li').has("ul").each(function (i) {
                    var branch = $(this); //li with children ul
                    branch.prepend("<i class='indicator indicator-sub glyphicon " + closedClassAfter + "'></i>");
                    branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
                    branch.addClass('branch');
                    branch.on('click', function (e) {
                        if (this == e.target) {
                            var icon = $(this).children('i:first');
                            icon.toggleClass(openedClass + " " + closedClass);
                            var iconsub = $(this).children('i.indicator-sub:first');
                            iconsub.toggleClass(openedClassAfter + " " + closedClassAfter);
                            $(this).children().children().toggle();
                        }
                    });
                    //branch.children().children().toggle();
                    if (i == 0) {
                        var icon = branch.children('i:first');
                        icon.toggleClass(openedClass + " " + closedClass);
                        var iconsub = branch.children('i.indicator-sub:first');
                        iconsub.toggleClass(openedClassAfter + " " + closedClassAfter);
                    }
                });

                //fire event from the dynamically added icon
                tree.find('.branch .indicator').each(function () {
                    $(this).on('click', function () {
                        $(this).closest('li').click();
                    });
                });
                //fire event to open branch if the li contains an anchor instead of text
                tree.find('.branch>a').each(function () {
                    $(this).on('click', function (e) {
                        ActiveMenuLeft(tree, $(this));
                        //Minhmx Update
                        //$(this).closest('li').click();
                        if ($(this).closest('li').children('i:first').hasClass('glyphicon-triangle-right')) //glyphicon-folder-close
                            $(this).closest('li').click();
                        //Minhmx Update END
                        //e.preventDefault();
                    });
                });
                tree.find('.branch ul li a').each(function () {
                    $(this).on('click', function (e) {
                        ActiveMenuLeft(tree, $(this));
                        CloseMenuWidthSmall();
                    });
                });

                //fire event to open branch if the li contains a button instead of text
                tree.find('.branch>button').each(function () {
                    $(this).on('click', function (e) {
                        $(this).closest('li').click();
                        e.preventDefault();
                    });
                });
            }
        });
        $('#tree1').treed();

        $(window).resize(function () {
            ResizeWindows();
        });
        $('.toggle-menu').click(function () {
            $('#slidebar').toggleClass('hidden');
        });

        function ActiveMenuLeft(tree, $this) {
            tree.find('.branch ul li a').removeClass('active');
            tree.find('.branch>a').removeClass('active');
            $this.addClass('active');
        }
        function ResizeWindows() {
            var currentWidth = window.innerWidth;
            var currentHeight = window.innerHeight;
            //console.log(currentWidth);
            if (currentWidth <= 768) {
                $('#slidebar').css('max-height', (window.innerHeight - 52) / 2);
                $('.toggle-menu').removeClass('hidden');
                $('#slidebar').addClass('hidden');
            } else {
                $('#slidebar').css('max-height', window.innerHeight - 52);
                $('.toggle-menu').addClass('hidden');
                $('#slidebar').removeClass('hidden');
            }
            var currentHeight = window.innerHeight;
            $('#KhungHT').css('height', currentHeight - 52);
        }

        function CloseMenuWidthSmall() {
            var currentWidth = window.innerWidth;
            if (currentWidth <= 769) {
                $('#slidebar').toggleClass('hidden');
            }
        }
        function ScrollToTag($tagControl) {
            $('iframe#KhungHT').contents().find('body .right-content').animate({
                scrollTop: $tagControl.offset().top-45
            }, 500);
        }
        function OpenParentSelected($tag) {
            $tag.closest('ul').each(function () {
                var $thisParent = $(this).parent();
                if ($thisParent.children("i:first").hasClass('glyphicon-triangle-right'))
                    $thisParent.trigger('click');

                if ($thisParent.closest('ul').length > 0)
                    OpenParentSelected($thisParent);
                return;
            });
        }
        function LoadHelpSelect() {
            var getHref = window.location.href;
            var arrHref = getHref.split('?');
            if (arrHref.length > 1) {
                var selected = arrHref[1];
                $('a#' + selected).click();               
                $('a#' + selected).click();
                OpenParentSelected($('a#' + selected));
                var thisHref = $('a#' + selected).attr('href');                    
				$('iframe#KhungHT').attr('src', "http://help.ecus.net.vn/"+thisHref); 
			
            }else{
				$('a#faq').click();
				$('iframe#KhungHT').attr('src', "http://help.ecus.net.vn/1.GIOITHIEUCHUNG.html");
				}
        }
        ResizeWindows();
        LoadHelpSelect();

});
       


 