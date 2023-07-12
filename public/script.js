console.log("%c" + "Jobshort", "color: #2891e1; font-size: 40px; font-weight: bold;");

$('.owl-carousel').owlCarousel({
    margin: 10,
    loop: false,
    autoWidth: true,
    items: 4,
    nav: false,
    dot: false
});

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

function goToPreviousPage() {
    window.history.back();
}

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

function search() {
    const keyword = document.getElementById('searchbar').value;
    if (keyword.trim() != "") {
        return this.submit();
    } else {
        return false;
    }
}

const searchbar = document.getElementById('searchbar-mobile');

function showSearchbar(element) {
    searchbar.style.display = 'flex';
}

function closeSearchbar(element) {
    searchbar.style.display = 'none';
}

const countryList = document.querySelectorAll('.suggestion-list');
const inputCountry = document.querySelectorAll('#location');

function displayCountries(names) {
    const li = document.createElement('li');
    li.textContent = names;
    countryList.forEach(element => {
        element.appendChild(li);
    });
}

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
            myStates(selectCountry);
        });
    });
}

const stateInput = document.querySelectorAll('#state');

function myStates(value) {
    if (value === "Malaysia") {
        fetch('/json/states.json').then(res => res.json())
        .then(data => {
            data.forEach(e => {
                stateInput.forEach(element => {
                    element.add(new Option(e.toLowerCase(), e));
                });
            });
        });
        stateInput.forEach(element => {
            myCity(element);
        });
    } else {
        stateInput.forEach(element => {
            element.innerHTML = "";
        });
    }
}

fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data => {
    allCountries(data);
});



const cityInput = document.querySelectorAll('#city');

function myCity(stateInput) {
    stateInput.addEventListener('change', e => {
        const stateValue = e.target.value;
    
        cityInput.forEach(element => {
            element.innerHTML = '';
        });
        
        fetch('/json/states-cities.json')
        .then(res => res.json())
        .then(data => {
            
            const cities = data[stateValue];

            cityInput.forEach(element => {
                element.add(new Option("Select Cities", null));
            });
            cities.forEach(e => {
                cityInput.forEach(element => {
                    element.add(new Option(e.toLowerCase(), e));
                });
            });
        });
    });
}


const fileImage = document.getElementById('profile-img');
const inputText = document.getElementById('file_text');
const img = document.getElementById('seller_img');

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


if (inputText && inputText.nextElementSibling) {
    const deleteImgIcon = inputText.nextElementSibling;
    deleteImgIcon.addEventListener('click', e => {
        e.preventDefault();
    
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG7WjONaOfilXR3bebrfe_zcjl58ZdAzJHYw&usqp=CAU";
        inputText.value = 'Choose a file...';
        fileImage.value = '';
    });
}


const employer = document.querySelectorAll('input[name="employer_type"]');
const names = document.getElementById('name-title');
const number = document.getElementById('number-title');

employer.forEach(element => {
    element.addEventListener('change', e => {

        if (e.target.getAttribute('id') == 'company') {
            names.textContent = 'Company Name';
            number.textContent = 'Registered Business Number';
        } else {
            names.textContent = 'Name';
            number.textContent = 'Identification Number';
        }
    });
});

$(document).ready(function() {
    $.ajaxSetup({
        headers:
        { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
    });

    // Wishlist 
    $('.wishlist').each(function(index, value) {
        $(value).on('click', function(e) {
            e.preventDefault();

            const jobSlug = e.target.previousElementSibling.value;
            
            $(value).css('display', 'none');
            const unwishlist = $(value).siblings('.unwishlist');
            $(unwishlist).css('display', 'block');

            $(value).removeClass('d-block').addClass('d-none');
            unwishlist.removeClass('d-none').addClass('d-block');
            
            $.ajax({
                url: `/saved/${jobSlug}`,
                method: 'POST',
                success: function(response) {
                    iziToast.success({
                        title: 'Success',
                        message: 'Added to Wishlist',
                        position: 'bottomLeft'
                    });
                }
            });
        });
    });
    $('.unwishlist').each(function(index, value) {
        $(value).on('click', function(e) {
            e.preventDefault();

            const jobSlug = e.target.nextElementSibling.value;

            $(value).css('display', 'none');
            const wishlist = $(value).siblings('.wishlist');
            $(wishlist).css('display', 'block');

            wishlist.removeClass('d-none').addClass('d-block');
            $(value).removeClass('d-block').addClass('d-none');

            $.ajax({
                url: `/unsaved/${jobSlug}`,
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
    });


    // Order Services
    $('.order-btn').click(function(e) {
        e.preventDefault();

        var service_id = $(e.target).siblings('#service_id').val(); // 4
        var freelancer_id = $(e.target).siblings('#freelancer_id').val();
        const loader = document.querySelector('.custom-loader');
        $(loader).css('display', 'block');

        setTimeout(() => {
            $(loader).css('display', 'none');
            $.ajax({
                url: `/orders/${service_id}/${freelancer_id}`,
                method: 'POST',
                success: function(res) {
                    if (res) {
                        $('.order-btn').addClass('d-none');
                        $('.order-btn').siblings('.d-none').removeClass('d-none');
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton: 'btn btn-sm px-3 py-2 btn-primary',
                            },
                            buttonsStyling: false
                        });
                
                        swalWithBootstrapButtons.fire({
                            title: 'Successfully Order',
                            icon: 'success',
                            position: 'center',
                            confirmButtonText: 'Check Order',
                            showCloseButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = '/account/profile/orders';
                            }
                        });
                    }
                }, error: function(error) {
                    console.error(error.responseText);
                }
            });
        }, 3000);
    });

    // $('.jobCategories').each(function(index, value) {
    //     $(value).on('click', function(e) {
    //         e.preventDefault();
            
    //         var categoriesValue = $(value).find('small')[0].textContent;
            
    //         $.ajax({
    //             url: `/category/${categoriesValue}`,
    //             method: 'GET',
    //             success: function(res) {
    //                 $('#view-job').html(res);
    //                 history.pushState({}, '', $(value).data('url'));
    //             }
    //         });
    //     });
    // });

    $('.reject-btn').each(function(index, value) {
        $(value).on('click', function(e) {
            e.preventDefault();

            let orderId = ($(value).siblings('#order_id')).val();
            
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
    });

    $('.complete-btn').each(function(index, value) {
        $(value).on('click', function(e) {
            e.preventDefault();
            
            let orderId = ($(value).siblings('#order_id')).val();

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

    $('.fa-star').each(function(index, value) {
        $(value).on('click', function(e) {
            e.preventDefault();

            $(this).prevAll().addBack().addClass('fa-solid');
            $(this).nextAll().addClass('fa-regular').removeClass('fa-solid');

            var indexStars = $(this).index() + 1;
            $('#starLength').val(indexStars);
        });
    });

    $('.formRating').submit(function(e) {
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
                // console.log(res);
            }, error: function(err) {
                console.error(err.responseText);
            }
        });
    });

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

    $('.notification-delete').each(function(index, value) {
        $(value).on('click', function(e) {
            e.preventDefault();

            $id = $(value).siblings('#notification-id').val();

            $.ajax({
                url: `/notifications/delete/${$id}`,
                method: 'DELETE',
                success: function(res) {
                    $(value).parent().parent().remove();
                }, error: function(err) {
                    console.log(err.responseText);
                }
            });
        });
    });  
});

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

const loader = document.querySelector('.custom-loader');

function timeRange(element) {
    loader.style.display = 'block';
    var searchValue = element.closest('#filter-list').querySelector('#search_value').value;
    let url = `/services/search`;
    
    if (element.getAttribute('id') === 'latest_service') {
        url += `/latest-service/${searchValue}`;
        element.setAttribute('checked', 'checked');
    } else if (element.getAttribute('id') === 'oldest_service') {
        url += `/oldest-service/${searchValue}`;
        element.setAttribute('checked', 'checked');
    }
    
    axios.get(url).then(res => {
        setTimeout(() => {
            loader.style.display = 'none';
            getDataFilter(res.data, 1);
        }, 1500);
    }).catch(err => {
        console.error(err.response.data.message);
    });
}

function orderRange(element) {
    loader.style.display = 'block';
    var searchValue = element.closest('#filter-list').querySelector('#search_value').value;
    let url = `/services/search`;
    
    if (element.getAttribute('id') === 'highest_order') {
        url += `/highest-order/${searchValue}`;
        element.setAttribute('checked', 'checked');
    } else if (element.getAttribute('id') === 'lowest_order') {
        url += `/lowest-order/${searchValue}`;
        element.setAttribute('checked', 'checked');
    }
    
    axios.get(url).then(res => {
        setTimeout(() => {
            loader.style.display = 'none';
            getDataFilter(res.data, 1);
        }, 1500);
    }).catch(err => console.error(err.response.data.message));
}

function ratingRange(element) {
    loader.style.display = 'block';
    var searchValue = element.closest('#filter-list').querySelector('#search_value').value;
    let url = `/services/search`;
    
    if (element.getAttribute('id') === 'highest_rating') {
        url += `/highest-rating/${searchValue}`;
        element.setAttribute('checked', 'checked');
    } else if (element.getAttribute('id') === 'lowest_rating') {
        url += `/lowest-rating/${searchValue}`;
        element.setAttribute('checked', 'checked');
    }

    axios.get(url).then(res =>  {
        setTimeout(() => {
            loader.style.display = 'none';
            getDataFilter(res.data, 1);
        }, 1500);
    }).catch(err => console.error(err.response.data.message));
}

function priceRange(element) {
    loader.style.display = 'block';
    var searchValue = element.closest('#filter-list').querySelector('#search_value').value;
    let url = `/services/search`;

    if (element.getAttribute('id') === 'highest_price') {
        url += `/highest-price/${searchValue}`;
        element.setAttribute('checked', 'checked');
    } else if (element.getAttribute('id') === 'lowest_price') {
        url += `/lowest-price/${searchValue}`;
        element.setAttribute('checked', 'checked');
    }

    axios.get(url).then(res => {
        setTimeout(() => {
            loader.style.display = 'none';
            getDataFilter(res.data, 1);
        }, 1500);
    }).catch(err => console.error(err.response.data.message));
}

function resetFilter(e) {
    var searchValue = e.closest('#filter-list').querySelector('#search_value').value;
    let url = `/services/search/reset/${searchValue}`;

    axios.get(url).then(res => {
        getDataFilter(res.data, 1);
        var radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(e => {
            if (e.getAttribute('checked') === 'checked') {
                e.checked = false;
            }
        });
    }).catch(err => console.error(err));
}

// users filter
$(document).ready(function() {
    $('#select-categories').change(function() {
        const freelancer_name = $(this).parent().parent().prev().val();
        $('#select-categories option:selected').each(function() {
            const category = $(this).val();

            axios.get(`/user/${freelancer_name}/filter-category/${category}`)
            .then(res => {
                // getDataFilter(res.data, 2);
            });
        });
    });  
});

function filterCategories(select) {
    loader.style.display = 'block';
    const freelancer_name = select.parentElement.parentElement.previousElementSibling.value;
    const optionSelected = select.options[select.selectedIndex].value;

    axios.get(`/user/${freelancer_name}/filter-category/${optionSelected}`)
    .then(res => {
        setTimeout(() => {
            loader.style.display = 'none';
            getDataFilter(res.data, 2);
        }, 1500);
    });
}

function sortService(select) {
    loader.style.display = 'block';
    const freelancer_name = select.parentElement.parentElement.nextElementSibling.value;
    const optionSelected = select.options[select.selectedIndex].value;

    axios.get(`/user/${freelancer_name}/sort-by/${optionSelected}`)
    .then(res => {
        setTimeout(() => {
            loader.style.display = 'none';
            getDataFilter(res.data, 2);
        }, 1500);
    }).catch(err => console.error(err.message));
}

function getDataFilter(services, action) {
    const parentService = document.getElementById('display_service');
    const parentUserService = document.getElementById('display-user-services');
    const filterCount = document.getElementById('filter-count');
    if (action == 1) {
        parentService.innerHTML = '';
    } else if (action == 2) {
        parentUserService.innerHTML = '';
        filterCount.innerHTML = '';
        filterCount.innerHTML = services.length;
    }
    
    services.forEach(service => {

        let countOrders = 0;
        service.order.forEach(e => {
            if (e.status === 'completed') {
                countOrders++;
            }
        });

        let maxStars = 0;
        service.rating.forEach(function(rating) {
            maxStars = rating.stars;
        });
        if (maxStars > 0) {
            stars = maxStars + '.0';
        } else {
            stars = '0'
        }
        const element = document.createElement('div');
        element.className += 'col-sm-6 col-12';
        element.innerHTML = 
            `<a href="/services/${service.slug}" class="d-block text-decoration-none">
                <div class="d-flex align-items-center justify-content-center flex-column">
                    <div class="rounded w-100 position-relative" style="height: 220px; overflow: hidden;">
                        <img src="/images/${service.image.split(',')[0]}" class="w-100 h-100" style="object-fit: cover;">
                        @if (!auth()->check())
                            <a href="{{ route('login') }}" class="text-decoration-none">
                                <i class="fa-regular fa-heart position-absolute" style="font-size: 18px; right: 15px; top: 10px;"></i>
                            </a>
                        @else
                            <i class="fa-solid fa-heart position-absolute unwishlist {{ count(auth()->user()->wishlist->where('service_id', $service->id)) == 1 ? 'd-block' : 'd-none' }}" style="font-size: 18px; right: 15px; top: 10px;"></i>
                            <input type="hidden" value="{{ $service->id }}">
                            <i class="fa-regular fa-heart position-absolute wishlist {{ count(auth()->user()->wishlist->where('service_id', $service->id)) == 1 ? 'd-none' : 'd-block' }}" style="font-size: 18px; right: 15px; top: 10px;"></i>
                        @endif
                    </div>
                    <div class="p-2 w-100 mt-1">
                        <div class="d-flex align-items-center justify-content-start">
                            <p class="mb-0 text-dark" style="width: 95%; font-size: 14.5px;">${service.title.slice(0, 35)}</p>
                            <div class="d-flex align-items-center justify-content-end flex-row-reverse">
                                <i class="fa-solid fa-star text-warning" style="font-size: 13.5px;"></i>
                                <small class="me-1 text-dark" style="font-size: 13.5px;">${stars}</small>
                            </div>
                        </div>
                        <small class="text-muted d-block" style="font-size: 12px;">${service.category}</small>
                        <div class="mt-2 d-flex align-items-center justify-content-between">
                            <small class="mb-0 text-dark" style="font-size: 14.5px;">$ ${service.price}</small>
                            <small class="mb-0 text-dark"><i class="me-1 mdi mdi-text-box-check-outline"></i>${countOrders}</small>
                        </div>
                    </div>
                </div>
            </a>`;

        if (action == 1) {
            parentService.appendChild(element);
        } else if (action == 2) {
            parentUserService.appendChild(element);
        }
    });
}

function openFilter(element) {
    const filter_mobile = document.getElementById('filter-mobile-container');
    if (!element.className.includes('open')) {
        element.className += ' open';
        filter_mobile.style.height = '75%';
    } else {
        element.classList.remove('open');
        filter_mobile.style.height = '0%';
    }
}

function closeFilter() {
    const filter_mobile = document.getElementById('filter-mobile-container');
    filter_mobile.style.height = '0%';
}


$(document).on('click', '.notification-link', function(e) {
    e.preventDefault();
    $(loader).css("display", "block");

    let url = $(this).data("notification-link");
    
    const link = $('.notification-link .nav-item');
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

$(document).on('click', '.read', function(e) {
    e.preventDefault();

    $id = $(this).siblings('#notification-id').val();
    $(this).removeClass('d-block');
    $(this).addClass('d-none');
    $(this).prev().removeClass('d-none');
    $(this).prev().addClass('d-block');
    
    $.ajax({
        url: `/notifications/read/${$id}`,
        method: 'POST',
        success: function(res) {
            if (res) {
                $(this).parent().parent().css('border', 'unset');
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

$(document).on('click', '.unread', function(e) {
    e.preventDefault();

    $id = $(this).siblings('#notification-id').val();
    $(this).removeClass('d-block');
    $(this).addClass('d-none');
    $(this).next().removeClass('d-none');
    $(this).next().addClass('d-block');

    $.ajax({
        url: `/notifications/unread/${$id}`,
        method: 'POST',
        success: function(res) {
            if (res) {
                $(this).parent().parent().css('border-left', '3px solid #2891e1');
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

// fetch('https://restcountries.com/v3.1/all')
// .then(res => res.json())
// .then(data => {
//     const dt = data.filter(e => e.name.common === 'Malaysia');
//     dt.forEach(e => {
//         console.log(e.currencies.MYR.symbol);
//     });
// });



