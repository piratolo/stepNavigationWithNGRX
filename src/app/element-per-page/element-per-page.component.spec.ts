import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPerPageComponent } from './element-per-page.component';

describe('ElementPerPageComponent', () => {
  let component: ElementPerPageComponent;
  let fixture: ComponentFixture<ElementPerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementPerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
