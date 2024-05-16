import { Component, EventEmitter, Input, KeyValueDiffers, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceInterface } from 'src/app/shared/models/DeviceInterface';

@Component({
  selector: 'app-interface-editor',
  templateUrl: './interface-editor.component.html',
  styleUrls: ['./interface-editor.component.scss']
})
export class InterfaceEditorComponent implements OnInit, OnChanges {
  hasChanges: boolean = false;

  @Input() interfaceList: Array<DeviceInterface> = [];
  @Output() listSubmit = new EventEmitter<Array<DeviceInterface>>();

  editorForm = this.fb.group({
    //name: new FormControl(''),
    interfaces: this.fb.array([])
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('interfaceList' in changes) {
      this.interfaces.clear()
      changes['interfaceList'].currentValue.forEach((deviceInterface: DeviceInterface) => this.addInterface(deviceInterface))
      this.hasChanges = false;
    }
  }

  get interfaces() {
    return this.editorForm.controls['interfaces'] as FormArray;
  }

  addInterface(deviceInterface: DeviceInterface) {
    const interfaceForm = this.createInterfaceRow();
    interfaceForm.setValue(deviceInterface);

    this.interfaces.push(interfaceForm);
  }

  addInterfaceRow() {
    this.interfaces.push(this.createInterfaceRow());
    this.hasChanges = true;
  }

  removeInterfaceRow(index: number) {
    this.interfaces.removeAt(index);
    this.hasChanges = true;
  }

  createInterfaceRow() {
    return this.fb.group({
      interfaceType: ['LAN', Validators.required],
      // https://stackoverflow.com/questions/44176120/pattern-validator-is-invalid-for-ip-address-regex
      address: ['', [Validators.required, Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      maskLength: [24, [Validators.required, Validators.min(8), Validators.max(32)]]
    });
  }

  submitList() {
    if (this.interfaces.valid) {
      this.listSubmit.emit(this.interfaces.value as DeviceInterface[])
    }
  }
}
