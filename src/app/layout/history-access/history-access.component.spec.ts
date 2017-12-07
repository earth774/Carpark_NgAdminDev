import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAccessComponent } from './history-access.component';

describe('HistoryAccessComponent', () => {
  let component: HistoryAccessComponent;
  let fixture: ComponentFixture<HistoryAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
