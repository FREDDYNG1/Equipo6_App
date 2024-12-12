import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage {
  nombreAlumno: string = ''; // Nombre del alumno
  scanResult: string = ''; // Resultado del escaneo (Asignatura)
  fecha: string = ''; // Fecha actual

  // Propiedades para el Toast
  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'danger'; // Color de advertencia

  constructor(
    private supabaseService: SupabaseService,
    private modalController: ModalController,
    private platform: Platform
  ) {}

  async ngOnInit() {
    // Verificar soporte de la cámara y permisos
    if (this.platform.is('capacitor')) {
      const isSupported = await BarcodeScanner.isSupported();
      if (isSupported) {
        const permissions = await BarcodeScanner.checkPermissions();
        if (!permissions.camera) {
          await BarcodeScanner.requestPermissions();
        }
      } else {
        this.showToastMessage('El escaneo de códigos no es compatible con este dispositivo.', 'danger');
      }
    }

    // Obtener datos del usuario autenticado usando SupabaseService
    try {
      const userData = await this.supabaseService.getUserNameAndLastName();
      if (userData && userData.name && userData.last_name) {
        // Combinar nombre y apellido
        this.nombreAlumno = `${userData.name} ${userData.last_name}`;
      } else {
        console.error('No se encontró información del usuario o faltan campos');
        this.showToastMessage('No se encontró información del usuario.', 'danger');
      }
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      this.showToastMessage('Error al cargar datos del usuario.', 'danger');
    }
  }

  // Método para mostrar mensajes en el Toast
  showToastMessage(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;

    // Ocultar el toast después de 3 segundos
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  // Método para escanear el código QR
  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        format: [], // Formatos de código QR
        LensFacing: LensFacing.Back, // Cámara trasera
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log('Datos recibidos del modal:', data);
    if (data) {
      const scannedData = data?.text || data?.barcode?.displayValue || 'No se obtuvo información';
      this.scanResult = scannedData; // Asignar el valor escaneado
      if (scannedData === 'No se obtuvo información') {
        this.showToastMessage('No se recibió información del escaneo.', 'danger');
      } else {
        this.showToastMessage('Código escaneado correctamente.', 'success');
      }
    } else {
      this.showToastMessage('No se recibió información del escaneo.', 'danger');
    }
  }

  // Método para registrar la asistencia
  async registrarClase() {
    try {
      // Validar campos requeridos
      if (!this.nombreAlumno || this.nombreAlumno.trim() === '' || !this.scanResult || this.scanResult.trim() === '') {
        this.showToastMessage('Por favor, completa todos los campos.', 'danger');
        return;
      }

      // Generar automáticamente la fecha actual
      this.fecha = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

      // Datos a enviar a Supabase
      const clase = {
        nombre_alumno: this.nombreAlumno,
        asignatura: this.scanResult, // El valor escaneado será la asignatura
        fecha: this.fecha,
      };

      // Registrar la asistencia en la base de datos
      const resultado = await this.supabaseService.registrarClase(clase);
      console.log('Asistencia registrada:', resultado);

      // Limpiar formulario
      this.scanResult = '';
      this.fecha = '';

      // Mostrar mensaje de éxito
      this.showToastMessage('Asistencia registrada exitosamente.', 'success');
    } catch (error) {
      console.error('Error al registrar la asistencia:', (error as any).message);
      this.showToastMessage('Hubo un error al registrar la asistencia.', 'danger');
    }
  }
}
