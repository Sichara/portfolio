/**
 * Created by 1 on 06.10.2015.
 */

function showDetails(elem, parent, link) {
    jQuery(elem).show('slow');
    jQuery(parent).addClass('partner-open');
    jQuery(link).addClass('partner-full-details-link-open');

}

function hideDetails(elem, parent, link) {
    jQuery(elem).hide('slow');
    jQuery(parent).removeClass('partner-open');
    jQuery(link).removeClass('partner-full-details-link-open');
}

function isHide(elem) {
    return elem.offsetHeight;
}

jQuery(document).ready(function() {
            jQuery('.partner-full-details-link').click(function(event) {
                event.preventDefault();

                var partnerNode = jQuery(this).closest('.partner');
                var detailNode = partnerNode.find('.partner-full-details');
                var link = this;

                jQuery(detailNode).toggle(
                    function() {
                        isHide(this) ? showDetails(this, partnerNode, link) : hideDetails(this, partnerNode, link);
                    });
            });
        });