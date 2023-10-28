//FUNCIONES PARA ENVIAR CORREOS ELECTRÓNICOS POR MEDIO DE UNA API

//Declaración de variables
const contactForm = document.querySelector("#contact-form");
const userName = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");

//Agregar evento submit al formulario
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
        service_id: "service_lxec1ka",
        template_id: "template_elznuy7",
        user_id: "0sY9GPamut6w-EOhf",
        template_params: {
            "to_name": userName.value,
            "from_name": userEmail.value,
            "subject": subject.value,
            "message": message.value,
        }
    };

    try {
        const response = await sendEmail(body);
        
        //Función mostrar alerta si el correo se envio con éxito
        if (response && response.includes("OK")) {
            Swal.fire({
                icon: "success",
                title: "Exito",
                text: "El correo se ha enviado con éxito!"
            });
            //Limpiar campos al enviar el correo
            userName.value = "";
            userEmail.value = "";
            subject.value = "";
            message.value = "";
        } else {
            alertError();
        };
    } catch(error) {
        alertError();
        console.log(error);
    }
});

//Función mostrar alerta si hay un error al enviar el correo 
const alertError = () => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Ocurrió un problema al enviar el correo. Por favor, inténtelo de nuevo.",
    });
};

//Funcion asincrónica-Fetch
const sendEmail = async (body) => {
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
        
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", settings);
    const data = await response.text();

    return data;
};
