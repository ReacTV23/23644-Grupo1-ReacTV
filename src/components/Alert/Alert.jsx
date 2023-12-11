import { useEffect } from 'react';
import Swal from 'sweetalert2';
import './Alert.css';

const Alert = ({ title, text, icon, confirmButtonText, cancelButtonText, onConfirm, onCancel }) => {

//   props:
//   title: El título del mensaje.
//   text: El texto del mensaje.
//   icon: El ícono que se muestra en el mensaje (puedes usar 'info', 'success', 'warning', 'error', etc.).
//   confirmButtonText: El texto del botón de confirmación.
//   cancelButtonText: El texto del botón de cancelación.
//   onConfirm: Una función que se ejecutará cuando el usuario confirme.
//   onCancel: Una función que se ejecutará cuando el usuario cancele

    useEffect(() => {
        Swal.fire({
            title,
            text,
            icon,
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText,
            customClass: {
                // Clases personalizadas para estilos específicos
                container: 'container-alert',
                title: 'title-alert',
                htmlContainer: 'content-alert',
                confirmButton: 'confirm-button-alert',
                cancelButton: 'cancel-button-alert',
            }
        }).then((result) => {
            if (result.isConfirmed) {
            if (onConfirm) {
                onConfirm();
                }
            } else if (result.isDismissed && onCancel) {
                onCancel();
            }
        });
    }, [title, text, icon, confirmButtonText, cancelButtonText, onConfirm, onCancel]);

  // Este componente no renderiza nada directamente, ya que Swal.showModal() toma el control.

    return null;
};

export default Alert;
