console.log("%c" + "Jobshort", "color: #2891e1; font-size: 40px; font-weight: bold;");

const loader = document.querySelector('.custom-loader');

// Slider
$('.owl-carousel').owlCarousel({
    margin: 10,
    loop: false,
    autoWidth: true,
    dot: false,
    nav: true,
    navText: [`<i class="fa-solid fa-angle-left"></i>`,`<i class="fa-solid fa-angle-right"></i>`],
    pagination: false,
});

// Fancybox Image Product 
$(document).ready(function() {
    $(".fancybox").fancybox({
    buttons: [
        "zoom",
        "share",
        "slideShow",
        "fullScreen",
        "download",
        "thumbs",
        "close"
    ],
    loop: true,
    transitionEffect: "slide",
    transitionDuration: 500
    });

    $(".fancybox").fancybox();
    
    $(".fancybox-prev").click(function() {
        $.fancybox.prev();
    });
    
    $(".fancybox-next").click(function() {
        $.fancybox.next();
    });
});

// Back History Btn
function goToPreviousPage() {
    window.history.back();
}

// Logout btn
function logout() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-sm px-3 py-2 btn-primary',
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Confirm Logout ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        position: 'center',
        confirmButtonText: 'Logout',
        showCloseButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById('logout-form').submit();
        }
    });
}

// Submit Search Service
$(document).ready(function() {
    $('.submitSearch').submit(function() {
        var keyword = $(this).children().find('.searchbar').val();
        if (keyword.trim() != '') {
            return $(this).submit();
        } else {
            return false;
        }
    });
});

const searchbar_mobile = document.getElementById('searchbar-mobile');

// Show Searchbar Mobile
function showSearchbar() {
    searchbar_mobile.style.display = 'flex';
    $('#searchbar').focus();
}

// Close Searchbar Mobile
function closeSearchbar() {
    searchbar_mobile.style.display = 'none';
}

// Show Searchbar Autocomplete
$(document).on('keyup', '.searchbar', function(e) {
    var keyword = $(this).val();

    const container = $('.autocomplete-container ');
    $(container).css('display', 'block');

    if (keyword.trim() != '') {
        $.ajax({
            url: '/services/search/autocomplete',
            method: 'GET',
            data: { keyword: keyword },
            success: function(res) {
                
                $(container).empty();

                if (res.length > 0) {
                    $(res).each(function(index, value) {
                        const element = `<li class="ps-3 dropdown-item py-2 autocomplete_link">${value.title}</li>`;
                        $(container).append(element);
                    });
                } else {
                    $(container).empty();
                }

            }, error: function(err) {
                console.error(err.responseJSON.message);
            }
        });
    } else {
        $(container).css('display', 'none');
    }
});

// Click Autocomplete 
$(document).on('click', '.autocomplete_link', function(e) {
    e.preventDefault();

    const form = $(this).closest('form');
    const searchbar = form.find('.searchbar');

    $(searchbar).val();
    $(searchbar).val($(this).text());

    $(this).parent().empty();

    $(form)[0].submit();
});

const countryList = document.querySelectorAll('.suggestion-list');
const inputCountry = document.querySelectorAll('#location');

// Display Select Countries
function displayCountries(names) {
    const li = document.createElement('li');
    li.textContent = names;
    countryList.forEach(element => {
        element.appendChild(li);
    });
}

// Display Countries
function findCountries(countries, event) {
    const inputValue = event.target.value.toLowerCase();

    countryList.forEach(element => {
        element.innerHTML = '';
    });
    
    if (inputValue.trim() !== '') {
        const search = countries.filter(dt => {
            const countriesName = dt.name.common.toLowerCase();
            return countriesName.startsWith(inputValue);
        });

        if (search.length <= 5) {
            countryList.forEach(element => {
                element.style.height = 'max-content';
                element.style.overflowY = 'unset';
            });
        } else {
            countryList.forEach(element => {
                element.style.height = '200px';
                element.style.overflowY = 'scroll';
            });
        }
        
        search.forEach(dt => {
            const dataName = dt.name.common;
            
            displayCountries(dataName);
        });
        
        countryList.forEach(element => {
            element.style.display = 'block';
            chooseCountries(element, event);
        });
    } else {
        countryList.forEach(element => {
            element.style.display = 'none';
        });
    }
}

function allCountries(countries) {
    inputCountry.forEach(element => {
        element.addEventListener('keyup', event => {
            findCountries(countries, event);
        });
    });
}

function chooseCountries(element, input) {
    const li = element.querySelectorAll('li');
    li.forEach(data => {
        data.addEventListener('click', e => {
            const selectCountry = input.target.value = e.target.textContent;
            element.style.display = 'none';
        });
    });
}

// Countries Api
fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data => {
    allCountries(data);
});


const fileImage = document.getElementById('profile-img');
const inputText = document.getElementById('file_text');
const img = document.getElementById('seller_img');

// insert Image
if (fileImage) {
    fileImage.addEventListener('change', () => {
        if (fileImage.files.length > 0) {
            const fileName =  fileImage.files[0];
            inputText.value =  fileImage.files[0].name;
            const imageUrl = URL.createObjectURL(fileName);
            img.removeAttribute('src');
            img.src = imageUrl;
        } else {
            inputText.value = 'Choose a file...';
        }
    });
}

// Delete Image
if (inputText && inputText.nextElementSibling) {
    const deleteImgIcon = inputText.nextElementSibling;
    deleteImgIcon.addEventListener('click', e => {
        e.preventDefault();
    
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG7WjONaOfilXR3bebrfe_zcjl58ZdAzJHYw&usqp=CAU";
        inputText.value = 'Choose a file...';
        fileImage.value = '';
    });
}

$(document).ready(function() {
    $.ajaxSetup({
        headers:
        { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
    });

    // Wishlist 
    $(document).on('click', '.wishlist', function(e) {
        e.preventDefault();

        const url = $(this).siblings('#wishlist_path').val();
        
        $(this).css('display', 'none');
        const unwishlist = $(this).siblings('.unwishlist');
        $(unwishlist).css('display', 'block');

        $(this).removeClass('d-block').addClass('d-none');
        unwishlist.removeClass('d-none').addClass('d-block');
        
        $.ajax({
            url: url,
            method: 'POST',
            success: function(response) {
                iziToast.success({
                    title: 'Success',
                    message: 'Added to Wishlist',
                    position: 'bottomLeft'
                });
            }, error: function(err) {
                console.error(err.responseText);
            }
        });
    });

    // UnWishlist 
    $(document).on('click', '.unwishlist', function(e) {
        e.preventDefault();

        const url = $(this).siblings('#unwishlist_path').val();

        $(this).css('display', 'none');
        const wishlist = $(this).siblings('.wishlist');
        $(wishlist).css('display', 'block');

        wishlist.removeClass('d-none').addClass('d-block');
        $(this).removeClass('d-block').addClass('d-none');

        $.ajax({
            url: url,
            method: 'DELETE',
            success: function(response) {
                iziToast.success({
                    title: 'Success',
                    message: 'Remove to Wishlist',
                    position: 'bottomLeft'
                });
            }
        });
    });

    // Form Rating
    $(document).on('submit', '.formRating', function(e) {
        e.preventDefault();

        if ($('#starLength').val() < 1) {
            alert('Star rating is required!');
            return;
        }

        var formData = new FormData(this);

        $.ajax({
            url: '/account/profile/orders/rating',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(res) {
                window.location.href = res;
            }, error: function(err) {
                console.error(err.responseText);
            }
        });
    });

    // Star Rating
    $(document).on('click', '.fa-star', function(e) {
        e.preventDefault();

        $(this).prevAll().addBack().addClass('fa-solid');
        $(this).nextAll().addClass('fa-regular').removeClass('fa-solid');

        var indexStars = $(this).index() + 1;
        $('#starLength').val(indexStars);
    });

    // Notify Service
    $('#notify').on('click', function(e) {
        e.preventDefault();

        $(this).addClass('d-none');

        var user_id = $(this).siblings('#user_id').val();
        var freelancer_id = $(this).siblings('#freelancer_id').val();
        
        $.ajax({
            url: `/notify/${user_id}/${freelancer_id}`,
            method: 'POST',
            success: function(res) {
                iziToast.success({
                    title: 'Success',
                    message: 'Notification Turn On',
                    position: 'bottomLeft'
                });
            }
        });
        $(this).next().removeClass('d-none');
    });

    // Unotify Service
    $('#disnotify').on('click', function(e) {
        e.preventDefault();

        $(this).addClass('d-none');
        
        var user_id = $(this).siblings('#user_id').val();
        var freelancer_id = $(this).siblings('#freelancer_id').val();

        $.ajax({
            url: `/disnotify/${user_id}/${freelancer_id}`,
            method: 'DELETE',
            success: function(res) {
                iziToast.success({
                    title: 'Success',
                    message: 'Notification Turn Off',
                    position: 'bottomLeft'
                });
            }
        });
        $(this).prev().removeClass('d-none');
    });

    // Read Notification
    $(document).on('click', '.read', function(e) {
        e.preventDefault();

        var id = $(this).siblings('#notification-id').val();
        $(this).removeClass('d-block');
        $(this).addClass('d-none');
        $(this).prev().removeClass('d-none');
        $(this).prev().addClass('d-block');
        const parent = $(this).parents()[1];
        
        $.ajax({
            url: `/notifications/read/${id}`,
            method: 'POST',
            success: function(res) {
                if (res) {
                    $(parent).css('border', 'unset');
                    iziToast.success({
                        title: 'Success',
                        message: 'Mark As Read',
                        position: 'bottomLeft'
                    });
                }
            }, error: function(err) {
                console.log(err.responseText);
            }
        });
    });

    // Unread Notification
    $(document).on('click', '.unread', function(e) {
        e.preventDefault();

        var id = $(this).siblings('#notification-id').val();
        $(this).removeClass('d-block');
        $(this).addClass('d-none');
        $(this).next().removeClass('d-none');
        $(this).next().addClass('d-block');
        const parent = $(this).parents()[1];

        $.ajax({
            url: `/notifications/unread/${id}`,
            method: 'POST',
            success: function(res) {
                if (res) {
                    $(parent).css('border-left', '3px solid #2891e1');
                    iziToast.success({
                        title: 'Success',
                        message: 'Mark As Unread',
                        position: 'bottomLeft'
                    });
                }
            }, error: function(err) {
                console.log(err.responseText);
            }
        });
    });

    // Delete Notification
    $(document).on('click', '.notification-delete', function(e) {
        e.preventDefault();

        var id = $(this).siblings('#notification-id').val();

        $.ajax({
            url: `/notifications/delete/${id}`,
            method: 'DELETE',
            success: function(res) {
                $(this).parent().parent().remove();
                if (res) {
                    iziToast.success({
                        title: 'Success',
                        message: 'Deleted',
                        position: 'bottomLeft'
                    });
                }
            }, error: function(err) {
                console.log(err.responseText);
            }
        });
    });

    // Reject-btn
    $(document).on('click', '.reject-btn', function(e) {
        e.preventDefault();

        let orderId = ($(this).siblings('#order_id')).val();
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm px-3 py-2 btn-primary',
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Cancel Order ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            position: 'center',
            confirmButtonText: 'Confirm',
            showCloseButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `/account/profile/orders/reject/${orderId}`,
                    method: 'POST',
                    success: function(res) {
                        if (res) {
                            swalWithBootstrapButtons.fire(
                                'Cancelled!',
                                'Your Request Will be Notify Soon.',
                                'success'
                            );
                        }
                    }
                });
            }
        });

    });

    // Complete-btn
    $(document).on('click', '.complete-btn', function(e) {
        e.preventDefault();
        
        let orderId = ($(this).siblings('#order_id')).val();

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm px-3 py-2 btn-primary',
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Complete Order ?',
            text: "Make sure your service has been completed!",
            icon: 'warning',
            position: 'center',
            confirmButtonText: 'Confirm',
            showCloseButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `/account/profile/orders/complete/${orderId}`,
                    method: 'POST',
                    success: function(res) {
                        if (res) {
                            swalWithBootstrapButtons.fire(
                                'Completed!',
                                'Your Order Has Been Completed!.',
                                'success'
                            );
                        }
                    }
                });
            }
        });
    });
});

// Image Insert
function autoImage(event) {
    if (event.target.files.length > 0) {
        const fileName = event.target.files[0];

        const imgTag = event.target.previousElementSibling;
        const icon = event.target.nextElementSibling;

        const xmark = event.target.nextElementSibling.nextElementSibling;;
        xmark.classList.remove('d-none');
        xmark.addEventListener('click', e => {
            e.preventDefault();
            imgTag.removeAttribute('src');
            imgTag.classList.add('d-none');
            icon.classList.remove('d-none');
            e.target.classList.add('d-none');
        });

        const imageUrl = URL.createObjectURL(fileName);
        imgTag.src = imageUrl;
        imgTag.classList.remove('d-none');
        icon.classList.add('d-none');
    }
}

// search filter
$(document).on('click', 'input[name="filter"]', function(e) {
    e.preventDefault();
    
    loader.style.display = 'block';
    
    var searchValue = $('#search_value').val();
    var path = $($(this)).attr('id');
    let url = `/services/search/${searchValue}/sort-by/${path}`;

    const container = $('#display_service');

    axios.get(url).then(res => {
        setTimeout(() => {
            loader.style.display = 'none';
            $(container).html('');
            $(container).html(res.data);
        }, 1500);
        closeFilter();
    }).catch(err => {
        console.error(err.response.data.message);
    });
});

// Reset filter page
function resetFilter() {
    closeFilter();
    
    var searchValue = $('#search_value').val();
    let url = `/services/search/reset/${searchValue}`;

    loader.style.display = 'block';
    const container = $('#display_service');

    axios.get(url).then(res => {
        var radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(e => {
            if (e.getAttribute('checked') === 'checked') {
                e.checked = false;
            }
            setTimeout(() => {
                loader.style.display = 'none';
                $(container).html('');
                $(container).html(res.data);
            }, 1500);
            
        });
    }).catch(err => console.error(err.response.data.message));
}

// filter Categoy in Freelancer Page
function filterCategories(element) {
    loader.style.display = 'block';
    const freelancer_name = $(element).closest('.d-flex').find('#freelancer-name').val();;
    const optionSelected = element.options[element.selectedIndex].value;
    
    const container = $('#display-user-services');
    
    axios.get(`/user/${freelancer_name}/filter-category/${optionSelected}`)
    .then(res => {
        const html = $(res.data);
        const servicesCount = html[0].value;
        setTimeout(() => {
            loader.style.display = 'none';
            $(container).html('');
            $(container).html(res.data);
            $('#filter-count').html('');
            $('#filter-count').html(servicesCount);
        }, 1500);
    });
}

// Reset sort search page
function sortService(element) {
    loader.style.display = 'block';
    const freelancer_name = $(element).closest('.d-flex').find('#freelancer-name').val();
    const optionSelected = element.options[element.selectedIndex].value;

    const container = $('#display-user-services');

    axios.get(`/user/${freelancer_name}/sort-by/${optionSelected}`)
    .then(res => {
        setTimeout(() => {
            loader.style.display = 'none';
            $(container).html('');
            $(container).html(res.data);
        }, 1500);
    });
}

// Filter Categories
function sortCategoryService(element) {
    loader.style.display = 'block';
    const category_slug = $(element).closest('.d-flex').find('#category_slug').val();
    const optionSelected = element.options[element.selectedIndex].value;

    const container = $('#service_container');

    axios.get(`/categories/${category_slug}/sort-by/${optionSelected}`)
    .then(res => {
        setTimeout(() => {
            loader.style.display = 'none';
            $(container).html('');
            $(container).html(res.data);
        }, 1500);
    }).catch(err => console.log(err));
}

// Open Filter Search Mobile
function openFilter(element) {
    const filter_mobile = document.getElementById('filter-mobile-container');
    if (!element.className.includes('open')) {
        element.className += ' open';
        filter_mobile.style.height = '80%';
    } else {
        element.classList.remove('open');
        filter_mobile.style.height = '0%';
    }
}

// Close Filter Search Mobile
function closeFilter() {
    const filter_mobile = document.getElementById('filter-mobile-container');
    filter_mobile.style.height = '0%';
}

// Notification Menu
$(document).on('click', '#notification-link', function(e) {
    e.preventDefault();
    $(loader).css("display", "block");

    let url = $(this).data("notification-link");

    const link = $('#notification-link .nav-item');
    $(link).removeClass('fw-bold');
    $(this).children('.nav-item').addClass('fw-bold');

    $.ajax({
        url: url,
        method: "GET",
        dataType: 'html',
        success: function(res) {
            const display_notification = $('#display-notification');
            setTimeout(() => {
                $(loader).css("display", "none");
                $(display_notification).html('');
                $(display_notification).html(res);
                history.pushState(null, null, url);
            }, 1000);
        }, error: function(err) {
            console.error(err);
        }
    });
});

// Profile Order
$(document).on('click', '.order-menu-link', function(e) {
    e.preventDefault();
    $(loader).css('display', 'block')

    $('.order-menu-link').removeClass('border-bottom border-2 border-primary');
    $(this).addClass('border-bottom border-2 border-primary');
    
    let url = $(this).data('order-link');
    const display_notification = $('#display-order');
    
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'html',
        success: function(res) {
            setTimeout(() => {
                $(loader).css('display', 'none')
                $(display_notification).html('');
                $(display_notification).html(res);
                history.pushState(null, null, url);
            }, 1000);
        }, error: function(err) {
            console.error(err.responseText);
        }
    });
});


