import {useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import './Alert.css';

const Alert = ({ title, text, icon, confirmButtonText, cancelButtonText, showCancelButton, onConfirm, onCancel }) => {
    
    const mySwal = withReactContent(Swal);
//   props:
//   title: El título del mensaje.
//   text: El texto del mensaje.
//   icon: El ícono que se muestra en el mensaje (puedes usar 'info', 'success', 'warning', 'error', etc.).
//   confirmButtonText: El texto del botón de confirmación.
//   cancelButtonText: El texto del botón de cancelación.
//   onConfirm: Una función que se ejecutará cuando el usuario confirme.
//   onCancel: Una función que se ejecutará cuando el usuario cancele

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const showSwal = async () => {
            const result = await mySwal.fire({
                title,
                text,
                icon,
                showCancelButton,
                confirmButtonText,
                cancelButtonText,
                customClass: {
                    container: 'container-alert',
                    title: 'title-alert',
                    htmlContainer: 'content-alert',
                    confirmButton: 'confirm-button-alert',
                    cancelButton: 'cancel-button-alert',
                }
            });
    
            if (result.isConfirmed && onConfirm) {
                onConfirm();
            } else if (result.isDismissed && onCancel) {
                onCancel();
            }
        };
    
        showSwal();
    }, [title, text, icon, confirmButtonText, cancelButtonText, onConfirm, onCancel]);

  // Este componente no renderiza nada directamente, ya que Swal.showModal() toma el control.

    return null;
};

export default Alert;
