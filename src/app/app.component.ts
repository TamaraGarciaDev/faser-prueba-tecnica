import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[] = [];
	
	mostrarModal: boolean = false;
	nuevaTarea: Tarea = {
		id: 0,
		titulo: '',
		minutos: 0
	};

	constructor(
		public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
		console.log('tareas', this.tareas);
	}

	agregarTarea() {
		if (!this.nuevaTarea.titulo.trim() || !this.nuevaTarea.minutos) {
			alert('Por favor, completa todos los campos');
			return;
		}

		const maxId = this.tareas.reduce((max, t) => t.id > max ? t.id : max, 0);
		this.nuevaTarea.id = maxId + 1;

		this.tareas.push({ ...this.nuevaTarea });

		

		this.cerrarModal();
		this.limpiarFormulario();
	}

	abrirModal() {
		this.mostrarModal = true;
		this.limpiarFormulario();
	}

	cerrarModal() {
		this.mostrarModal = false;
	}

	limpiarFormulario() {
		this.nuevaTarea = {
			id: 0,
			titulo: '',
			minutos: 0
		};
	}
}