// Bootstrap dismiss alert afte 2sec
$(".alert").alert();
window.setTimeout(function () { $(".alert").alert('close'); }, 2000);

// Bootstrap ToolTip
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})