import {Component, EventEmitter, effect, inject, input, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {Home} from '../../../../../core/home/home.model';

@Component({
  selector: 'common-modal-add-home',
  imports: [
    Button,
    Dialog,
    InputText,
    Message,
    ReactiveFormsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class CommonModalAddHomeComponent {
  homes = input<Home[]>()
  loadingHomes = input<boolean>(false);

  @Output() onSubmit: EventEmitter<Home> = new EventEmitter();

  protected form!: FormGroup;
  protected visible: boolean = false;

  private formBuilder = inject(FormBuilder)

  constructor() {
    effect(() => {
      this.homes();
      this.form?.get('identifier')?.updateValueAndValidity({onlySelf: true});
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      identifier: ['', [Validators.required, this.uniqueIdentifierValidator()]],
    });
  }

  public showModal() {
    this.visible = true;
    this.form.reset()
  }

  protected save() {
    this.onSubmit.emit({
      id: 0,
      name: this.form.value.name,
      identifier: this.form.value.identifier,
      timestamp: Date.now(),
    });
    this.form.reset()
    this.visible = false;
  }

  protected cancel() {
    this.form.reset()
    this.visible = false;
  }

  private uniqueIdentifierValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const taken = this.homes()?.some(h => h.identifier === control.value);
      return taken ? { notUnique: true } : null;
    };
  }

  protected isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched);
  }

  protected hasError(controlName: string, error: string) {
    return this.form.get(controlName)?.hasError(error) && this.form.get(controlName)?.touched;
  }
}
