/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */

 $(document).ready(function() {
     console.log( "ready" );
 });


  $("#cart-confirmation").click(function(e) {
    console.log("confirmed cart")
    var items = CartJS.cart.items
    items.forEach((item, index) => {
      //CART JS est bien initié, le JS capte bien les item.quantity mais me balance néanmoins l'alerte
      console.log("this is the item quantity")
      console.log(item.quantity)
      console.log("this is the item quantity modulo 6")
      console.log(item.quantity % 6)
      if ((item.quantity % 6) != 0) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        alert("Pour bénéficier du tarif PRO, veuillez acheter vos produits par lots de 6 articles")
      }
    })
  })

  $("#pro_minus").click(function(e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    console.log($("#pro_step"))
    console.log($("#pro_step").text())
    $('.QuantitySelector__CurrentQuantity').val(parseInt($('.QuantitySelector__CurrentQuantity').val()) - parseInt($("#pro_step").text()))
  })

  $("#pro_plus").click(function(e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    console.log($("#pro-step"))
    console.log($("#pro-step").text())
    $('#pro_quantity').val(parseInt($('#pro_quantity').val()) + parseInt($("#pro_step").text()))
  })

  $(".address-block").click(function(e) {
    console.log("clicked address block")
    $(this).toggleClass("selected-address")
  });

$("#call-drawer").click(function(e) {
  e.preventDefault();
  cartJS.getCart()
  var cart = CartJS.cart
  var customer_id = $("#id").text()
  var customer_mail = $("#mail").text()
  var cip = parseInt($("#total_pro").data('proprice'))
  var total_price = parseInt(cart["total_price"])
  var line_items = CartJS.cart.items
  var cip = parseInt($("#cip").text())
  console.log(cip)
  console.log(customer_id)
  console.log(customer_mail)
  console.log(pro_price)
  console.log("this is the cart")
  console.log(cart)
  console.log("this is the total price")
  console.log(total_price)
  console.log("these are the line items")
  console.log(line_items)
  $(".Segment__Title").addClass("no-show")
  $(".Modal__Header").addClass("no-show")
  $(".Form__Header").addClass("no-show")
  $(".Modal__Content").html("<img src='https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif'>")
  $.ajax({
      type: "POST",
      url: "https://caliceapp.herokuapp.com/checkout_pro",
      crossDomain: true,
      headers: {
              "Access-Control-Allow-Origin": "*",
              'Access-Control-Allow-Methods':'POST',
              'Access-Control-Allow-Headers':'application/json'
            },
      data:  {
        customer_mail: customer_mail,
        cip: cip,
        customer_id: customer_id,
        pro_price: pro_price,
        total_price: total_price,
        line_items: JSON.stringify(line_items)
      },
      success: function(data) {
        console.log(data)
        $(".Modal__Content").html("<div><h1>MERCI POUR VOTRE COMMANDE !</h1><h3>Vous recevrez d'ici quelques instants un email de confirmation</h3></div>")
      },
      error : function(resultat, statut, erreur){
        console.log(statut, erreur)
        $(".Modal__Content").html("<div><h1>Malheureusement, votre commande n'a pas pu aboutir.</h1><h3>Si le problème persiste, contactez-nous!.</h3></div>")
      },
      dataType: 'json'
      })
  });

$("#procheckout").click(function() {
    CartJS.getCart()
    console.log(CartJS.cart)
    console.log(CartJS.cart.total_price)
  })

$("#call-cart").click(function(e) {
  e.preventDefault();
  CartJS.getCart()
  var cart = CartJS.cart
  var note = $("#note").text()
  var customer_mail = $("#mail").text()
  var customer_id = $("#id").text()
  var pro_price = parseInt($("#total_pro").data('proprice'))
  var total_price = parseInt(cart["total_price"])
  var line_items = CartJS.cart.items
  var cip = parseInt($("#cip").text())
  console.log(cart)
  console.log(cip)
  console.log(customer_id)
  console.log(customer_mail)
  console.log(pro_price)
  console.log(total_price)
  $(".Segment__Title").addClass("no-show")
  $(".Modal__Header").addClass("no-show")
  $(".Form__Header").addClass("no-show")
  $(".Modal__Content").html("<img src='https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif'>")
  $.ajax({
      type: "POST",
      url: "https://caliceapp.herokuapp.com/checkout_pro",
      crossDomain: true,
      headers: {
              "Access-Control-Allow-Origin": "*",
              'Access-Control-Allow-Methods':'POST',
              'Access-Control-Allow-Headers':'application/json'
            },
      data:  {
        customer_mail: customer_mail,
        cip: cip,
        customer_id: customer_id,
        pro_price: pro_price,
        total_price: total_price,
        line_items: JSON.stringify(line_items),
        note: note
      },
      success: function(data) {
        console.log(data)
        $(".Modal__Content").html("<div><h1>MERCI POUR VOTRE COMMANDE !</h1><h3>Vous recevrez d'ici quelques instants un email de confirmation</h3></div>")
        $("#modal-got-address2").addClass("order-sent")
        $(".order-sent").click(function(e) {
          console.log("order sent ??.................")
          $.ajax({
            type: "POST",
            url: "https://calicea.myshopify.com/cart/clear",
            crossDomain: false,
            headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods':'POST',
                    'Access-Control-Allow-Headers':'application/json'
                  },
            data:  {
            },
            success: function(data) {
              console.log(data)
              window.location = "https://calicea.myshopify.com/"
            },
            error : function(resultat, statut, erreur){
              console.log(statut, erreur)
            },
            dataType: 'json'
          })
        })
      },
      error : function(resultat, statut, erreur){
        console.log(statut, erreur)
        $(".Modal__Content").html("<div><h1>Malheureusement, votre commande n'a pas pu aboutir.</h1><h3>Si le problème persiste, contactez-nous!.</h3></div>")
      },
      dataType: 'json'
      })
  });


  $("#pro-checkbox").click(function() {
    console.log("click")
    $(".pro-info").toggleClass("no-show")
    $("#password").toggleClass("no-show")
    $(".pro-input").prop('required',true);

  })

  $("#submit-register").click(function(e) {
      if ( (!$("#raison_sociale").val()) || (!$("#cip-form").val()) || (!$("#siret").val()) || (!$("#tel").val()) ) {
        alert("Veuillez renseigner tous les champs marqués d'une *")
      }
      else {
        console.log($("#pro-checkbox").checked)
        console.log($("#pro-checkbox").active == true)
        e.preventDefault()
        var first_name = $("#first_name").val()
        var last_name = $("#last_name").val()
        var customer_mail = $("#mail").val()
        var customer_tel = $("#tel").val()
        var address1 = $("#address1").val()
        var zip = $("#zip").val()
        var city = $("#city").val()
        var cip = $("#cip-form").val()
        var siret = $("#siret").val()
        var raison_sociale = $("#raison_sociale").val()
        console.log(customer_mail)
        console.log(customer_tel)
        console.log(address1)
        console.log(zip)
        console.log(cip)
        console.log(city)
        console.log(siret)
        console.log(raison_sociale)
        $("#create_customer").addClass("no-show")
        $("#sign_up_complete").removeClass("no-show")

            $.ajax({
              type: "POST",
              url: "https://caliceapp.herokuapp.com/create_pro_customer",
              crossDomain: false,
              headers: {
                      "Access-Control-Allow-Origin": "*",
                      'Access-Control-Allow-Methods':'POST',
                      'Access-Control-Allow-Headers':'application/json'
                    },
              data:  {
                first_name: first_name,
                last_name: last_name,
                customer_mail: customer_mail,
                customer_tel: customer_tel,
                address1: address1,
                zip: zip,
                city: city,
                cip: cip,
                siret: siret,
                raison_sociale: raison_sociale
              },
              success: function(data) {
                console.log(data)
                if (data["answer"]){
                  window.location = "https://calicea.myshopify.com/pages/register-validation"
                }
                else {
                  var errors = data["errors"]
                  $("#create_customer").removeClass("no-show")
                  $("#sign_up_complete").addClass("no-show")

                  alert("Il y a eu une erreur, vérifiez vos informations et recommencez")
                  console.log(errors)
                }
              },
              error : function(resultat, statut, erreur){
                console.log(statut, erreur)
              },
              dataType: 'json'
            })
          }
        })

      $("#meta_update").click(function(e) {
          e.preventDefault()
          var cip = $("#cip-edit").val()
          var siret = $("#siret-edit").val()
          var raison_sociale = $("#raison_sociale-edit").val()
          var customer_id = $("#customer_id").text()
          console.log(customer_id)
          console.log(cip)
          console.log(siret)
          console.log(raison_sociale)
              $.ajax({
                type: "POST",
                url: "https://caliceapp.herokuapp.com/edit_pro",
                crossDomain: false,
                headers: {
                        "Access-Control-Allow-Origin": "*",
                        'Access-Control-Allow-Methods':'POST',
                        'Access-Control-Allow-Headers':'application/json'
                      },
                data:  {
                  customer_id: customer_id,
                  cip: cip,
                  siret: siret,
                  raison_sociale: raison_sociale
                },
                success: function(data) {
                  console.log(data)
                  console.log(data["errors"])
                  window.location = "https://calicea.myshopify.com/account"
                },
                error : function(resultat, statut, erreur){
                  console.log(statut, erreur)
                },
                dataType: 'json'
              })
            })









