//----------Show alert on successful upload start----------
$(document).ready(function () {
  $("#upload_data").submit(function () {
    //  $("#status").empty().text("File is uploading...");
    $(this).ajaxSubmit({
      error: function (xhr) {
        // status("Error: " + xhr.status);
      },

      success: function (response) {
        // $("#status").empty().text(response);
        alert(response);
        location.reload();
      },
      error: function (request, status, error) {
        alert(request.responseJSON.message);
      },
    });
    //Very important line, it disable the page refresh.
    return false;
  });
});
//----------Show alert on successful upload ends----------

//----------Show alert on successful edit start----------
$(document).ready(function () {
  $("#edit_data").submit(function () {
    //  $("#status").empty().text("File is uploading...");
    $(this).ajaxSubmit({
      error: function (xhr) {
        // status("Error: " + xhr.status);
      },

      success: function (response) {
        // $("#status").empty().text(response);
        alert(response);
        location.reload();
      },
    });
    //Very important line, it disable the page refresh.
    return false;
  });
});
//----------Show alert on successful edit ends----------

//-------show edit blogs the data starts----------
$(".table tbody td a.edit").click(function () {
  $("#edit_data").css("display", "block");

  //get api name and data
  let _id = $(this).attr("data-id");
  let _api = $(this).attr("data-api");

  //set form action
  $("#edit_data").attr("action", `/api/${_api}/${_id}`);

  //get form
  let formName = document.forms[`upload_form`];

  // formName._id.value = _id;

  //faq
  if (_api == "faq") {
    let question = $(this).attr("data-question");
    let answer = $(this).attr("data-answer");

    formName.question.value = question;
    formName.answer.value = answer;
  }

  //camps
  if (_api == "past_camps" || _api == "upcoming_camps") {
    let overview = $(this).attr("data-overview");
    let challenge = $(this).attr("data-challenge");
    let solution = $(this).attr("data-solution");
    let highlights = $(this).attr("data-highlights");

    formName.heading.value = heading;
    formName.overview.value = overview;
    formName.challenge.value = challenge;
    formName.solution.value = solution;
    formName.highlights.value = highlights;
  }

  //remedy
  if (_api == "remedies") {
    let name = $(this).attr("data-name");
    let description = $(this).attr("data-description");
    let remedy = $(this).attr("data-remedy");

    formName.name.value = name;
    formName.description.value = description;
    formName.remedy.value = remedy;
  }

  //product
  if (_api == "products") {
    let name = $(this).attr("data-name");
    let price = $(this).attr("data-price");
    let especialities = $(this).attr("data-especialities");
    let content = $(this).attr("data-content");
    let discount = $(this).attr("data-discount");
    let ingredients = $(this).attr("data-ingredients");
    let usage_and_benefits = $(this).attr("data-usage_and_benefits");
    let how_to_use = $(this).attr("data-how_to_use");
    let disclaimer = $(this).attr("data-disclaimer");

    formName.name.value = name;
    formName.especialities.value = especialities;
    formName.content.value = content;
    formName.price.value = price;
    formName.discount.value = discount;
    formName.ingredients.value = ingredients;
    formName.usage_and_benefits.value = usage_and_benefits;
    formName.how_to_use.value = how_to_use;
    formName.disclaimer.value = disclaimer;
  }

  //product category
  if (_api == "product_category") {
    let category = $(this).attr("data-category");
    let details = $(this).attr("data-details");

    formName.category.value = category;
    formName.details.value = details;
  }

  //career
  if (_api == "job_openings") {
    let position = $(this).attr("data-position");
    let location = $(this).attr("data-location");

    formName.position.value = position;
    formName.location.value = location;
  }

  //testimonials
  if (_api == "testimonials") {
    let name = $(this).attr("data-name");
    let testimonial = $(this).attr("data-testimonial");
    formName.name.value = name;
    formName.heading.value = heading;
    formName.testimonial.value = testimonial;
  }
});
//-------show edit blogs the data ends----------//

//-------delete the data starts----------
$(".table tbody td a.delete").click(function () {
  let _id = $(this).attr("data-id");
  let _api = $(this).attr("data-api");

  let request = {
    url: `https://trividhaa.herokuapp.com/api/${_api}/${_id}`,
    method: "DELETE",
  };

  if (confirm("Do you really want to delete? If yes not able to restore.!!")) {
    $.ajax(request).done(function (response) {
      alert("Data Deleted Successfully");
      location.reload();
    });
  }
});
//--------- delete the data ends-----------

//------hide edit form starts------------
function hideEditform(data) {
  document.getElementById(data.dataset.hide).style.display = "none";
}
//------hide edit form ends------------
