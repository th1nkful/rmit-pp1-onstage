var appPage = {};

$(document).ready(function() {
	appPage.initialise();
}).on("click", ".editable-toggle", function() {
	appPage.editToggle($(this));
})

appPage.initialise = function() {
	let newRegister = (new URLSearchParams( document.location.search.substring(1) ).get("newRegister") == "yes") ? true : false;
	if ( newRegister ) $("#newRegister").modal("show");

	$('.select2-instrument-view').select2({
		theme: "material",
		disabled: true
	});

	$('.select2-genre-view').select2({
		theme: "material",
		disabled: true
	});

	$('.select2-instrument-edit').select2({
		placeholder: "Choose instruments...",
		ajax: {
			url: '/api/instrument/',
			data: function (params) {
				var query = {
					search: params.term
				};
				return query;
			}
		},
		theme: "material"
	});

	$('.select2-genre-edit').select2({
		placeholder: "Choose genres...",
		ajax: {
			url: '/api/genre/',
			data: function (params) {
				var query = {
					search: params.term
				};
				return query;
			}
		},
		theme: "material"
	});

	$(".select2-selection__arrow").addClass("material-icons").html("arrow_drop_down");
};

appPage.editToggle = function($this) {
	var target = $this.data().target;
	var controls = $this.data().controls;

	$(".editable." + target).hide();
	$(".editable." + target + "." + controls).show();

	if ( controls == "edit" ) {
		$(".editable." + target + ".view").find("[data-id]").each(function() {
			var id = $(this).prop("id").split("-data")[0];
			$("#" + id).val($(this).data().id);
		});
	}
};

$(".social-media-toggle").click(function () {

	if($(".social-media-edit").is(":hidden")) {

		$("#instagram_user").val($("#instagram_user-data").data("id"));
		$("#twitter_user").val($("#twitter_user-data").data("id"));
		$("#facebook_user").val($("#facebook_user-data").data("id"));
		$("#youtube_user").val($("#youtube_user-data").data("id"));
	};

	$(".social-media-view").toggle();
	$(".social-media-edit").toggle();
});

$(".band-toggle").click(function () {

	if($(".band-edit").is(":hidden")) {

		$("#members_needed").val($("#members_needed-data").data("id"));
		$("#required_commitment_level_id").val($("#required_commitment_level_id-data").data("id"));
		$("#required_music_experience").val($("#required_music_experience-data").data("id"));
		$("#required_past_gigs").val($("#required_past_gigs-data").data("id"));
		$("#required_gig_frequency_id").val($("#required_gig_frequency_id-data").data("id"));
		$("#preference_age_bracket_id").val($("#preference_age_bracket_id-data").data("id"));
	};

	$(".band-view").toggle();
	$(".band-edit").toggle();
});
