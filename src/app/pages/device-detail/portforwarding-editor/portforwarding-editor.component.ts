import { EventEmitter, Input, KeyValueDiffers, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { PortForward } from 'src/app/shared/models/PortForward';

@Component({
  selector: 'app-portforwarding-editor',
  templateUrl: './portforwarding-editor.component.html',
  styleUrls: ['./portforwarding-editor.component.css']
})
export class PortforwardingEditorComponent {
  hasChanges: boolean = false;

  @Input() portforwardList: Array<PortForward> = [];
  @Output() listSubmit = new EventEmitter<Array<PortForward>>();

  editorForm = this.fb.group({
    //name: new FormControl(''),
    portForwards: this.fb.array([])
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('portforwardList' in changes) {
      this.portForwards.clear();
      changes['portforwardList'].currentValue.forEach((devicePortForward: PortForward) => this.addPortForward(devicePortForward));
      this.hasChanges = false;
    }
  }

  get portForwards() {
    return this.editorForm.controls['portForwards'] as FormArray;
  }

  addPortForward(portForward: PortForward) {
    const portForwardForm = this.createPortForwardRow();
    portForwardForm.setValue(portForward);

    this.portForwards.push(portForwardForm);
  }

  addPortForwardRow() {
    const portForwardForm = this.createPortForwardRow();

    if (this.portForwards.length) {
      let lastItem = {...this.portForwards.value[this.portForwards.length -1]};
      lastItem.wanPort++;

      portForwardForm.setValue(lastItem);
    }
    //portForwardForm.get('wanPort')?.setValue()
    this.portForwards.push(portForwardForm);
    this.hasChanges = true;
  }

  removePortForwardRow(index: number) {
    this.portForwards.removeAt(index);
    this.hasChanges = true;
  }

  createPortForwardRow() {
    return this.fb.group({
      wanPort: [1025, [Validators.required, Validators.min(1), Validators.max(65535)]],
      // https://stackoverflow.com/questions/44176120/pattern-validator-is-invalid-for-ip-address-regex
      lanHost: ['', [Validators.required, Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      lanHostPort: [1025, [Validators.required, Validators.min(1), Validators.max(65535)]],
      hairpinNAT: [false, Validators.required]
    });
  }

  submitList() {
    if (this.portForwards.valid) {
      this.listSubmit.emit(this.portForwards.value as PortForward[])
    }
  }
}
