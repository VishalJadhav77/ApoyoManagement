import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HireWorkforce } from './hire-workforce';

describe('HireWorkforce', () => {
  let component: HireWorkforce;
  let fixture: ComponentFixture<HireWorkforce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HireWorkforce],
    }).compileComponents();

    fixture = TestBed.createComponent(HireWorkforce);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
