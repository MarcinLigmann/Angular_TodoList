import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-submit-text',
  standalone: true,
  imports: [],
  template: `
          <div>
        <input #input
          class="border-b border-b-orange-400 outline-none"
          (keyup.enter)="submitText.emit(input.value); input.value = ''"
        />
        <button
          (click)="submitText.emit(input.value); input.value = ''"
          class="border border-orange-400 ml-4 px-4 hover:scale-x-110">
          Add
        </button>
      </div>
  `,
  styles: [
    `
      input:focus + button {
        @apply text-orange-400;
      }
    `
  ],
})
export class SubmitTextComponent {
@Output() submitText = new EventEmitter<string>();
}
