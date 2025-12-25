import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ObjectivesList } from './objectives-list';

describe('ObjectivesList', () => {
  let component: ObjectivesList;
  let fixture: ComponentFixture<ObjectivesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectivesList, ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjectivesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation message when less than minimum objectives', () => {
    component.objectives = ['One objective'];
    expect(component.validationMessage).toContain('Add at least 4 learning objectives');
  });

  it('should not show validation message when minimum met', () => {
    component.objectives = ['Obj 1', 'Obj 2', 'Obj 3', 'Obj 4'];
    expect(component.validationMessage).toBe('');
  });

  it('should allow adding objectives when under max', () => {
    component.objectives = [];
    expect(component.canAddMore).toBe(true);
  });

  it('should not allow adding objectives when at max', () => {
    component.objectives = new Array(10).fill('Objective');
    expect(component.canAddMore).toBe(false);
  });

  it('should validate objective length', () => {
    component.newObjectiveControl.setValue('short');
    expect(component.newObjectiveError).toContain('at least 10 characters');

    component.newObjectiveControl.setValue('This is a valid objective');
    expect(component.newObjectiveError).toBe('');
  });

  it('should add valid objective', () => {
    const onChange = vi.fn();
    component.registerOnChange(onChange);

    component.newObjectiveControl.setValue('This is a valid learning objective');
    component.addObjective();

    expect(component.objectives).toContain('This is a valid learning objective');
    expect(component.newObjectiveControl.value).toBe('');
    expect(onChange).toHaveBeenCalled();
  });

  it('should remove objective', () => {
    const onChange = vi.fn();
    component.registerOnChange(onChange);
    component.objectives = ['Objective 1', 'Objective 2'];

    component.removeObjective(0);

    expect(component.objectives).toEqual(['Objective 2']);
    expect(onChange).toHaveBeenCalled();
  });

  it('should handle editing', () => {
    component.objectives = ['Original objective text'];

    component.startEdit(0);
    expect(component.editingIndex).toBe(0);
    expect(component.editControl.value).toBe('Original objective text');

    component.editControl.setValue('Updated objective text');
    component.saveEdit();

    expect(component.objectives[0]).toBe('Updated objective text');
    expect(component.editingIndex).toBe(null);
  });

  it('should cancel editing', () => {
    component.objectives = ['Original objective text'];
    component.startEdit(0);
    component.editControl.setValue('Changed');
    component.cancelEdit();

    expect(component.editingIndex).toBe(null);
    expect(component.objectives[0]).toBe('Original objective text');
  });
});
