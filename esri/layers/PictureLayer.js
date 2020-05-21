// See http://www.arcgisonline.cn
// Emaial: xleigs@163.com, xulei@esrichina.com.cn
//>>built
require({
  cache: {
    'esri/geometry/support/scaleUtils': function() {
      define(['require', 'exports', 'esri/config', 'esri/core/unitUtils'], function(r, l, p, b) {
        function a(a, f) {
          f = b.getMetersPerUnitForSR(f);
          return a / (f * b.inchesPerMeter * p.screenDPI);
        }

        Object.defineProperty(l, '__esModule', { value: !0 });
        l.getScale = function(a, f) {
          f = f || a.extent;
          a = a.width;
          var k = b.getMetersPerUnitForSR(f && f.spatialReference);
          return f && a ? f.width / a * k * b.inchesPerMeter * p.screenDPI : 0;
        };
        l.getResolutionForScale = a;
        l.getScaleForResolution = function(a,
                                           f) {
          f = b.getMetersPerUnitForSR(f);
          return a * f * b.inchesPerMeter * p.screenDPI;
        };
        l.getExtentForScale = function(b, f) {
          var k = b.extent;
          b = b.width;
          f = a(f, k.spatialReference);
          return k.clone().expand(f * b / k.width);
        };
      });
    }, 'esri/layers/mixins/ArcGISMapService': function() {
      define('require exports esri/core/tsSupport/declareExtendsHelper esri/core/tsSupport/decorateHelper esri/core/accessorSupport/decorators esri/geometry/Extent esri/geometry/SpatialReference esri/layers/support/commonProperties'.split(' '), function(r, l, p, b, a, u, f, k) {
        Object.defineProperty(l, '__esModule', { value: !0 });
        l.ArcGISMapService = function(m) {
          return function(m) {
            function h() {
              var a = null !== m && m.apply(this, arguments) || this;
              a.capabilities = void 0;
              a.copyright = null;
              a.fullExtent = null;
              a.legendEnabled = !0;
              a.spatialReference = null;
              a.version = null;
              return a;
            }

            p(h, m);
            h.prototype.readCapabilities = function(a, b) {
              var d = b.capabilities && b.capabilities.split(',').map(function(a) {
                return a.toLowerCase().trim();
              });
              if (!d) return {
                operations: {
                  supportsQuery: !1, supportsExportMap: !1, supportsExportTiles: !1,
                  supportsTileMap: !1,
                }, exportMap: null, exportTiles: null,
              };
              a = this.type;
              var f = -1 !== d.indexOf('query'), g = -1 !== d.indexOf('map'), k = !!b.exportTilesAllowed,
                d = -1 !== d.indexOf('tilemap'), e = 'tile' !== a && !!b.supportsDynamicLayers,
                h = 'tile' !== a && (!b.tileInfo || e), m = 'tile' !== a && (!b.tileInfo || e);
              return {
                operations: {
                  supportsQuery: f,
                  supportsExportMap: g,
                  supportsExportTiles: k,
                  supportsTileMap: d,
                },
                exportMap: g ? {
                    supportsSublayersChanges: 'tile' !== a,
                    supportsDynamicLayers: e,
                    supportsSublayerVisibility: h,
                    supportsSublayerDefinitionExpression: m,
                  } :
                  null,
                exportTiles: k ? { maxExportTilesCount: +b.maxExportTilesCount } : null,
              };
            };
            h.prototype.readVersion = function(a, b) {
              (a = b.currentVersion) || (a = b.hasOwnProperty('capabilities') || b.hasOwnProperty('tables') ? 10 : b.hasOwnProperty('supportedImageFormatTypes') ? 9.31 : 9.3);
              return a;
            };
            b([a.property({ readOnly: !0 })], h.prototype, 'capabilities', void 0);
            b([a.reader('service', 'capabilities', ['capabilities', 'exportTilesAllowed', 'maxExportTilesCount', 'supportsDynamicLayers', 'tileInfo'])], h.prototype, 'readCapabilities', null);
            b([a.property({ json: { read: { source: 'copyrightText' } } })],
              h.prototype, 'copyright', void 0);
            b([a.property({ type: u })], h.prototype, 'fullExtent', void 0);
            b([a.property({
              json: {
                origins: {
                  service: { read: !1 },
                  'portal-item': { read: !1 },
                },
              },
            })], h.prototype, 'id', void 0);
            b([a.property({
              type: Boolean,
              json: {
                origins: { service: { read: { enabled: !1 } } },
                read: { source: 'showLegend' },
                write: { target: 'showLegend' },
              },
            })], h.prototype, 'legendEnabled', void 0);
            b([a.property(k.popupEnabled)], h.prototype, 'popupEnabled', void 0);
            b([a.property({ type: f })], h.prototype, 'spatialReference', void 0);
            b([a.property()],
              h.prototype, 'version', void 0);
            b([a.reader('version', ['currentVersion', 'capabilities', 'tables', 'supportedImageFormatTypes'])], h.prototype, 'readVersion', null);
            return h = b([a.subclass('esri.layers.mixins.ArcGISMapService')], h);
          }(a.declared(m));
        };
      });
    }, 'esri/layers/mixins/SublayersOwner': function() {
      define('require exports esri/core/tsSupport/assignHelper esri/core/tsSupport/declareExtendsHelper esri/core/tsSupport/decorateHelper esri/core/Collection esri/core/CollectionFlattener esri/core/Error esri/core/lang esri/core/Logger esri/core/accessorSupport/decorators esri/core/accessorSupport/ensureType esri/core/accessorSupport/PropertyOrigin esri/layers/support/Sublayer esri/layers/support/sublayerUtils'.split(' '),
        function(r, l, p, b, a, u, f, k, m, w, h, A, g, d, x) {
          function v(a, b, e) {
            var f = [], q = {};
            if (!a) return f;
            a.forEach(function(a) {
              var t = new d;
              t.read(a, b);
              e && (-1 === e.indexOf(t.id) ? t.visible = !1 : t.visible = !0);
              q[t.id] = t;
              null != a.parentLayerId && -1 !== a.parentLayerId ? (a = q[a.parentLayerId], a.sublayers || (a.sublayers = []), a.sublayers.unshift(t)) : f.unshift(t);
            });
            return f;
          }

          function y(a, b) {
            var d = b.get(a.id);
            d ? (m.mixin(a.__accessor__.store._values, d.__accessor__.store._values), d.__accessor__.overridden && (a.__accessor__.overridden = m.mixin(a.__accessor__.overridden ||
              {}, d.__accessor__.overridden)), d.sublayers && (a.sublayers = d.sublayers.map(function(a) {
              return y(a, b);
            }))) : a.sublayers && a.sublayers.forEach(function(a) {
              return y(a, b);
            });
            return a;
          }

          Object.defineProperty(l, '__esModule', { value: !0 });
          var e = w.getLogger('esri.layers.TileLayer');
          l.SublayersOwner = function(m) {
            return function(m) {
              function n() {
                for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
                var d = m.apply(this, a) || this;
                d.allSublayers = new f({
                  root: d,
                  rootCollectionNames: ['sublayers'],
                  getChildrenFunction: function(a) {
                    return a.sublayers;
                  },
                });
                d.watch('sublayers', function(a, b) {
                  return d._handleSublayersChange(a, b);
                }, !0);
                return d;
              }

              b(n, m);
              n.prototype.readServiceSublayers = function(a, b, d) {
                return v(b.layers, d);
              };
              n.prototype.readSublayersFromItemOrWebMap = function(a, b, d) {
                return !b.layers && b.visibleLayers ? b.visibleLayers.map(function(a) {
                  return { id: a };
                }) : v(b.layers, d, b.visibleLayers);
              };
              n.prototype.readSublayers = function(a, b, d) {
                a = v(b.layers, d);
                return a;
              };
              n.prototype.writeSublayers = function(a, b, d, f) {
                if (a && this.serviceSublayers) {
                  a = a.slice().reverse().flatten(function(a) {
                    return (a = a.sublayers) && a.toArray().reverse();
                  }).toArray();
                  var e = this.serviceSublayers.flatten(function(a) {
                    return (a = a.sublayers) && a.toArray().reverse();
                  }).toArray().reduce(function(a, b) {
                    a.set(b.id, b);
                    return a;
                  }, new Map), k = !1, g = !0;
                  this.capabilities && this.capabilities.operations.supportsExportMap && this.capabilities.exportMap.supportsDynamicLayers ? (k = x.isExportDynamic(a, this.serviceSublayers,
                    this), g = !k && x.sameStructureAsService(a, this.serviceSublayers)) : g = x.sameStructureAsService(a, this.serviceSublayers);
                  b.layers = [];
                  a.forEach(function(a) {
                    var c = e.get(a.id),
                      c = p({ writeAsDynamic: k, writeOverridesOnly: g, serviceSublayer: c }, f);
                    a = a.write({}, c);
                    (!g || g && 1 < Object.keys(a).length) && b.layers.push(a);
                  });
                  a = a.filter(function(a) {
                    return a.visible;
                  }).map(function(a) {
                    return a.id;
                  });
                  'tile' !== this.type && (b.visibleLayers = a);
                }
              };
              n.prototype.findSublayerById = function(a) {
                return this.allSublayers.find(function(b) {
                  return b.id ===
                    a;
                });
              };
              n.prototype.createServiceSublayers = function() {
                return this.serviceSublayers.map(function(a) {
                  return a.clone();
                });
              };
              n.prototype._updateSublayersForOrigin = function(a, b) {
                var f = this.__accessor__.store;
                if (f.has('sublayers', a)) {
                  var e = f.get('sublayers', a).flatten(function(a) {
                    return a.sublayers;
                  });
                  if (e.every(function(a) {
                    return !a.__accessor__.store._values.hasOwnProperty('minScale');
                  })) {
                    var g = e.reduce(function(a, b) {
                      a.set(b.id, b);
                      return a;
                    }, new Map);
                    b = b.map(function(a) {
                      return y(a.clone(), g);
                    });
                    f.set('sublayers',
                      new (u.ofType(d))(b), a);
                  }
                }
              };
              n.prototype._handleSublayersChange = function(a, b) {
                var d = this;
                b && (b.forEach(function(a) {
                  a.parent = null;
                  a.layer = null;
                }), this._sublayersHandles.forEach(function(a) {
                  return a.remove();
                }), this._sublayersHandles = null);
                a && (a.forEach(function(a) {
                  a.parent = d;
                  a.layer = d;
                }), this._sublayersHandles = [a.on('after-add', function(a) {
                  a = a.item;
                  a.parent = d;
                  a.layer = d;
                }), a.on('after-remove', function(a) {
                  a = a.item;
                  a.parent = null;
                  a.layer = null;
                })], 'tile' === this.type && this._sublayersHandles.push(a.on('before-changes',
                  function(a) {
                    e.error(new k('tilelayer:sublayers-non-modifiable', 'Sublayer can\'t be added, moved, or removed from the layer\'s sublayers', { layer: d }));
                    a.preventDefault();
                  })));
              };
              a([h.property({ readOnly: !0 })], n.prototype, 'allSublayers', void 0);
              a([h.property({ readOnly: !0, type: u.ofType(d) })], n.prototype, 'serviceSublayers', void 0);
              a([h.reader('service', 'serviceSublayers', ['layers'])], n.prototype, 'readServiceSublayers', null);
              a([h.property({
                value: null, type: u.ofType(d), json: {
                  type: [Number], write: {
                    target: 'subLayerIds',
                    allowNull: !0,
                  },
                },
              })], n.prototype, 'sublayers', void 0);
              a([h.reader(['web-map', 'web-scene', 'portal-item'], 'sublayers', ['layers', 'visibleLayers'])], n.prototype, 'readSublayersFromItemOrWebMap', null);
              a([h.reader('service', 'sublayers', ['layers'])], n.prototype, 'readSublayers', null);
              a([h.writer('sublayers', {
                layers: { type: [d] },
                visibleLayers: { type: [A.Integer] },
              })], n.prototype, 'writeSublayers', null);
              return n = a([h.subclass('esri.layers.mixins.SublayersOwner')], n);
            }(h.declared(m));
          };
        });
    }, 'esri/layers/support/Sublayer': function() {
      define('require exports esri/core/tsSupport/declareExtendsHelper esri/core/tsSupport/decorateHelper esri/core/tsSupport/paramHelper esri/core/tsSupport/generatorHelper esri/core/tsSupport/awaiterHelper esri/PopupTemplate esri/renderers esri/symbols esri/core/Collection esri/core/Error esri/core/JSONSupport esri/core/lang esri/core/Logger esri/core/promiseUtils esri/core/urlUtils esri/core/accessorSupport/decorators esri/core/accessorSupport/ensureType esri/core/accessorSupport/write esri/layers/support/commonProperties esri/layers/support/LabelClass esri/layers/support/layerSourceUtils esri/renderers/support/jsonUtils esri/tasks/support/Query'.split(' '),
        function(r, l, p, b, a, u, f, k, m, w, h, A, g, d, x, v, y, e, D, E, n, F, q, G, t) {
          var B = x.getLogger('esri.layers.support.Sublayer'), H = 0;
          return function(a) {
            function c(C) {
              C = a.call(this, C) || this;
              C._sublayersHandles = null;
              return C;
            }

            p(c, a);
            z = c;
            Object.defineProperty(c.prototype, 'definitionExpression', {
              get: function() {
                return this._get('definitionExpression');
              }, set: function(a) {
                this._setAndNotifyLayer('definitionExpression', a);
              }, enumerable: !0, configurable: !0,
            });
            Object.defineProperty(c.prototype, 'id', {
              get: function() {
                var a = this._get('id');
                return null == a ? H++ : a;
              }, set: function(a) {
                this._get('id') !== a && (!1 === this.get('layer.capabilities.exportMap.supportsDynamicLayers') ? this._logLockedError('id') : this._set('id', a));
              }, enumerable: !0, configurable: !0,
            });
            Object.defineProperty(c.prototype, 'labelingInfo', {
              get: function() {
                return this._get('labelingInfo');
              }, set: function(a) {
                this._setAndNotifyLayer('labelingInfo', a);
              }, enumerable: !0, configurable: !0,
            });
            c.prototype.writeLabelingInfo = function(a, b, c, d) {
              (!d || d.writeAsDynamic) && a && a.length && (b.layerDefinition =
                {
                  drawingInfo: {
                    labelingInfo: a.map(function(a) {
                      return a.write({}, d);
                    }),
                  },
                });
            };
            Object.defineProperty(c.prototype, 'labelsVisible', {
              get: function() {
                return this._get('labelsVisible');
              }, set: function(a) {
                this._setAndNotifyLayer('labelsVisible', a);
              }, enumerable: !0, configurable: !0,
            });
            c.prototype.writeLabelsVisible = function(a, b, c, d) {
              if (!d || d.writeAsDynamic) b.showLabels = a;
            };
            Object.defineProperty(c.prototype, 'layer', {
              set: function(a) {
                this._set('layer', a);
                this.sublayers && this.sublayers.forEach(function(C) {
                  return C.layer = a;
                });
              },
              enumerable: !0, configurable: !0,
            });
            Object.defineProperty(c.prototype, 'legendEnabled', {
              get: function() {
                return this._get('legendEnabled');
              }, set: function(a) {
                this._set('legendEnabled', a);
              }, enumerable: !0, configurable: !0,
            });
            Object.defineProperty(c.prototype, 'listMode', {
              get: function() {
                return this._get('listMode');
              }, set: function(a) {
                this._set('listMode', a);
              }, enumerable: !0, configurable: !0,
            });
            Object.defineProperty(c.prototype, 'minScale', {
              get: function() {
                return this._get('minScale');
              }, set: function(a) {
                this._setAndNotifyLayer('minScale',
                  a);
              }, enumerable: !0, configurable: !0,
            });
            c.prototype.readMinScale = function(a, b) {
              return b.minScale || b.layerDefinition && b.layerDefinition.minScale || 0;
            };
            c.prototype.writeMinScale = function(a, b, c, d) {
              if (d && d.writeOverridesOnly && (c = d && d.serviceSublayer) && c.minScale === a && c.maxScale === this.maxScale) return;
              b.minScale = a;
            };
            Object.defineProperty(c.prototype, 'maxScale', {
              get: function() {
                return this._get('maxScale');
              }, set: function(a) {
                this._setAndNotifyLayer('maxScale', a);
              }, enumerable: !0, configurable: !0,
            });
            c.prototype.readMaxScale =
              function(a, b) {
                return b.maxScale || b.layerDefinition && b.layerDefinition.maxScale || 0;
              };
            c.prototype.writeMaxScale = function(a, b, c, d) {
              if (d && d.writeOverridesOnly && (c = d && d.serviceSublayer) && c.maxScale === a && c.minScale === this.minScale) return;
              b.maxScale = a;
            };
            Object.defineProperty(c.prototype, 'opacity', {
              get: function() {
                return this._get('opacity');
              }, set: function(a) {
                this._setAndNotifyLayer('opacity', a);
              }, enumerable: !0, configurable: !0,
            });
            c.prototype.readOpacity = function(a, b) {
              a = b.layerDefinition;
              return 1 - .01 * (null != a.transparency ?
                a.transparency : a.drawingInfo.transparency);
            };
            c.prototype.writeOpacity = function(a, b, c, d) {
              if (!d || d.writeAsDynamic) b.layerDefinition = { drawingInfo: { transparency: 100 - 100 * a } };
            };
            c.prototype.writeParent = function(a, b, c, d) {
              d && d.writeOverridesOnly || (b.parentLayerId = this.parent && this.parent !== this.layer ? this.parent.id : -1);
            };
            Object.defineProperty(c.prototype, 'popupEnabled', {
              get: function() {
                return this._get('popupEnabled');
              }, set: function(a) {
                this._set('popupEnabled', a);
              }, enumerable: !0, configurable: !0,
            });
            Object.defineProperty(c.prototype,
              'popupTemplate', {
                get: function() {
                  return this._get('popupTemplate');
                }, set: function(a) {
                  this._set('popupTemplate', a);
                }, enumerable: !0, configurable: !0,
              });
            Object.defineProperty(c.prototype, 'renderer', {
              get: function() {
                return this._get('renderer');
              }, set: function(a) {
                if (a) for (var b = 0, d = a.getSymbols(); b < d.length; b++) if (w.isSymbol3D(d[b])) {
                  B.warn('Sublayer renderer should use 2D symbols');
                  break;
                }
                this._setAndNotifyLayer('renderer', a);
              }, enumerable: !0, configurable: !0,
            });
            c.prototype.readRenderer = function(a, b, d) {
              if (a = b.layerDefinition.drawingInfo.renderer ||
                void 0) (a = G.read(a, b, d) || void 0) || B.error('Failed to create renderer', {
                rendererDefinition: b.drawingInfo.renderer,
                layer: this,
                context: d,
              });
              return a;
            };
            c.prototype.writeRenderer = function(a, b, d, c) {
              if (!c || c.writeAsDynamic) b.layerDefinition = { drawingInfo: { renderer: a.toJSON() } };
            };
            c.prototype.writeWebSceneRenderer = function(a, b, d, c) {
              if (!c || c.writeAsDynamic) b.layerDefinition = { drawingInfo: { renderer: a.toJSON() } };
            };
            Object.defineProperty(c.prototype, 'source', {
              get: function() {
                return this._get('source') || {
                  mapLayerId: this.id,
                  type: q.MAPLAYER,
                };
              }, set: function(a) {
                this._setAndNotifyLayer('source', a);
              }, enumerable: !0, configurable: !0,
            });
            c.prototype.writeSource = function(a, b, d, c) {
              c && !c.writeAsDynamic && c.writeOverridesOnly || (b.layerDefinition = { source: q.sourceToJSON(a) });
            };
            Object.defineProperty(c.prototype, 'sublayers', {
              set: function(a) {
                this._handleSublayersChange(a, this._get('sublayers'));
                this._set('sublayers', a);
              }, enumerable: !0, configurable: !0,
            });
            c.prototype.castSublayers = function(a) {
              return D.default(h.ofType(z), a);
            };
            c.prototype.writeSublayers =
              function(a, b, c, d) {
                d && d.writeOverridesOnly || this.get('sublayers.length') && (b[c] = this.sublayers.map(function(a) {
                  return a.id;
                }).toArray().reverse());
              };
            Object.defineProperty(c.prototype, 'title', {
              get: function() {
                return this._get('title');
              }, set: function(a) {
                this._set('title', a);
              }, enumerable: !0, configurable: !0,
            });
            c.prototype.writeTitle = function(a, b, d, c) {
              if (c && c.writeOverridesOnly && (c = c && c.serviceSublayer) && c.title === a) return;
              b[d] = a;
            };
            Object.defineProperty(c.prototype, 'url', {
              get: function() {
                var a = this.layer, b = this.source;
                if (!a) return null;
                if (q.isMapLayerSource(b)) return a.parsedUrl.path + '/' + b.mapLayerId;
                b = { layer: JSON.stringify({ source: q.sourceToJSON(this.source) }) };
                return a.parsedUrl.path + '/dynamicLayer?' + y.objectToQuery(b);
              }, set: function(a) {
                a ? this._override('url', a) : this._clearOverride('url');
              }, enumerable: !0, configurable: !0,
            });
            Object.defineProperty(c.prototype, 'visible', {
              get: function() {
                return this._get('visible');
              }, set: function(a) {
                this._setAndNotifyLayer('visible', a);
              }, enumerable: !0, configurable: !0,
            });
            c.prototype.writeVisible =
              function(a, b, c, d) {
                if (d && d.writeOverridesOnly && (d = d && d.serviceSublayer) && d.visible === a) return;
                b[c] = a;
              };
            c.prototype.clone = function() {
              var a = new z;
              this.hasOwnProperty('definitionExpression') && (a.definitionExpression = this.definitionExpression);
              this.hasOwnProperty('id') && (a.id = this.id);
              this.hasOwnProperty('labelingInfo') && (a.labelingInfo = d.clone(this.labelingInfo));
              this.hasOwnProperty('labelsVisible') && (a.labelsVisible = this.labelsVisible);
              this.hasOwnProperty('legendEnabled') && (a.legendEnabled = this.legendEnabled);
              this.hasOwnProperty('visible') && (a.visible = this.visible);
              this.hasOwnProperty('layer') && (a.layer = this.layer);
              this.hasOwnProperty('minScale') && (a.minScale = this.minScale);
              this.hasOwnProperty('maxScale') && (a.maxScale = this.maxScale);
              this.hasOwnProperty('opacity') && (a.opacity = this.opacity);
              this.hasOwnProperty('parent') && (a.parent = this.parent);
              this.hasOwnProperty('popupEnabled') && (a.popupEnabled = this.popupEnabled);
              this.hasOwnProperty('popupTemplate') && (a.popupTemplate = this.popupTemplate ? this.popupTemplate.clone() :
                this.popupTemplate);
              this.hasOwnProperty('renderer') && (a.renderer = this.renderer ? this.renderer.clone() : this.renderer);
              this.hasOwnProperty('source') && (a.source = d.clone(this.source));
              this.hasOwnProperty('sublayers') && (a.sublayers = this.sublayers ? this.sublayers.clone() : this.sublayers);
              this.hasOwnProperty('title') && (a.title = this.title);
              return a;
            };
            c.prototype.createQuery = function() {
              return new t({ returnGeometry: !0, where: this.definitionExpression || '1\x3d1' });
            };
            c.prototype.createFeatureLayer = function() {
              return f(this,
                void 0, void 0, function() {
                  var a, b, c, f, e;
                  return u(this, function(z) {
                    switch (z.label) {
                      case 0:
                        if (this.hasOwnProperty('sublayers')) return [2, null];
                        a = this.layer && this.layer.parsedUrl;
                        b = this.source;
                        c = null;
                        a && (c = q.isMapLayerSource(b) ? a.path + '/' + b.mapLayerId : a.path + '/dynamicLayer');
                        return [4, v.create(function(a) {
                          return r(['esri/layers/FeatureLayer'], a);
                        })];
                      case 1:
                        return f = z.sent(), e = new f({ url: c }), this.hasOwnProperty('definitionExpression') && (e.definitionExpression = this.definitionExpression), this.hasOwnProperty('labelingInfo') &&
                        (e.labelingInfo = d.clone(this.labelingInfo)), this.hasOwnProperty('labelsVisible') && (e.labelsVisible = this.labelsVisible), this.hasOwnProperty('legendEnabled') && (e.legendEnabled = this.legendEnabled), this.hasOwnProperty('visible') && (e.visible = this.visible), this.hasOwnProperty('minScale') && (e.minScale = this.minScale), this.hasOwnProperty('maxScale') && (e.maxScale = this.maxScale), this.hasOwnProperty('opacity') && (e.opacity = this.opacity), this.hasOwnProperty('popupTemplate') && (e.popupTemplate = this.popupTemplate ?
                          this.popupTemplate.clone() : this.popupTemplate), this.hasOwnProperty('renderer') && (e.renderer = this.renderer ? this.renderer.clone() : this.renderer), this.hasOwnProperty('source') && q.isDataLayerSource(this.source) && (e.dynamicDataSource = d.clone(this.source)), this.hasOwnProperty('title') && (e.title = this.title), [2, e];
                    }
                  });
                });
            };
            c.prototype.queryFeatures = function(a, b) {
              var c = this;
              void 0 === a && (a = this.createQuery());
              return v.all([v.create(function(a) {
                return r(['esri/tasks/operations/query'], a);
              }), v.create(function(a) {
                return r(['esri/tasks/support/FeatureSet'],
                  a);
              })]).then(function(d) {
                var e = d[0].executeQuery, f = d[1];
                return e(c.url, t.from(a), b).then(function(a) {
                  return f.fromJSON(a.data);
                });
              }).then(function(a) {
                a && a.features && a.features.forEach(function(a) {
                  a.sourceLayer = c;
                });
                return a;
              });
            };
            c.prototype.toExportImageJSON = function() {
              var a = { id: this.id, source: q.sourceToJSON(this.source) };
              this.definitionExpression && (a.definitionExpression = this.definitionExpression);
              if (this.renderer || this.labelingInfo || null != this.opacity || null != this.labelsVisible) {
                var b = a.drawingInfo = {};
                this.renderer && (b.renderer = this.renderer.toJSON());
                null != this.labelsVisible && (b.showLabels = this.labelsVisible);
                !1 !== this.labelsVisible && this.labelingInfo && (b.labelingInfo = this.labelingInfo.map(function(a) {
                  return a.write({}, { origin: 'service' });
                }), b.showLabels = !0);
                null != this.opacity && (b.transparency = 100 - 100 * this.opacity);
              }
              return a;
            };
            c.prototype._setAndNotifyLayer = function(a, b) {
              var c = this.layer, d = this._get(a), e;
              switch (a) {
                case 'definitionExpression':
                  e = 'supportsSublayerDefinitionExpression';
                case 'minScale':
                case 'maxScale':
                case 'visible':
                  e =
                    'supportsSublayerVisibility';
                  break;
                case 'labelingInfo':
                case 'labelsVisible':
                case 'opacity':
                case 'renderer':
                case 'source':
                  e = 'supportsDynamicLayers';
              }
              e && !1 === this.get('layer.capabilities.exportMap.' + e) ? this._logLockedError(a) : (this._set(a, b), d !== b && c && c.emit && c.emit('sublayer-update', { propertyName: a }));
            };
            c.prototype._handleSublayersChange = function(a, b) {
              var c = this;
              b && (b.forEach(function(a) {
                a.parent = null;
                a.layer = null;
              }), this._sublayersHandles.forEach(function(a) {
                return a.remove();
              }), this._sublayersHandles =
                null);
              a && (a.forEach(function(a) {
                a.parent = c;
                a.layer = c.layer;
              }), this._sublayersHandles = [a.on('after-add', function(a) {
                a = a.item;
                a.parent = c;
                a.layer = c.layer;
              }), a.on('after-remove', function(a) {
                a = a.item;
                a.parent = null;
                a.layer = null;
              }), a.on('before-changes', function(a) {
                var b = c.get('layer.capabilities.exportMap.supportsSublayersChanges');
                null == b || b || (B.error(new A('sublayer:sublayers-non-modifiable', 'Sublayer can\'t be added, moved, or removed from the layer\'s sublayers', { layer: c })), a.preventDefault());
              })]);
            };
            c.prototype._logLockedError =
              function(a) {
                B.error(new A('sublayer:locked', 'Property \'' + a + '\' can\'t be changed on Sublayer from the layer \'' + this.layer.id + '\'', {
                  sublayer: this,
                  layer: this.layer,
                }));
              };
            var z;
            b([e.property({
              type: String,
              value: null,
              json: {
                read: { source: 'layerDefinition.definitionExpression' },
                write: { target: 'layerDefinition.definitionExpression' },
              },
            })], c.prototype, 'definitionExpression', null);
            b([e.property({ type: Number, json: { write: { ignoreOrigin: !0 } } })], c.prototype, 'id', null);
            b([e.property({
              value: null, type: [F], json: {
                read: { source: 'layerDefinition.drawingInfo.labelingInfo' },
                write: { target: 'layerDefinition.drawingInfo.labelingInfo' },
              },
            })], c.prototype, 'labelingInfo', null);
            b([e.writer('labelingInfo')], c.prototype, 'writeLabelingInfo', null);
            b([e.property({
              type: Boolean,
              json: { read: { source: 'showLabels' }, write: { target: 'showLabels' } },
            })], c.prototype, 'labelsVisible', null);
            b([e.writer('labelsVisible')], c.prototype, 'writeLabelsVisible', null);
            b([e.property({ value: null })], c.prototype, 'layer', null);
            b([e.property(n.legendEnabled)], c.prototype, 'legendEnabled', null);
            b([e.property({
              type: ['show',
                'hide', 'hide-children'],
              value: 'show',
              json: { read: !1, write: !1, origins: { 'web-scene': { read: !0, write: !0 } } },
            })], c.prototype, 'listMode', null);
            b([e.property({
              type: Number, value: 0, json: {
                write: {
                  overridePolicy: function(a, b, c) {
                    if (E.willPropertyWrite(this, 'maxScale', {}, c)) return { ignoreOrigin: !0 };
                  },
                },
              },
            })], c.prototype, 'minScale', null);
            b([e.reader('portal-item', 'minScale', ['minScale', 'layerDefinition.minScale'])], c.prototype, 'readMinScale', null);
            b([e.writer('minScale')], c.prototype, 'writeMinScale', null);
            b([e.property({
              type: Number,
              value: 0, json: {
                write: {
                  overridePolicy: function(a, b, c) {
                    if (E.willPropertyWrite(this, 'minScale', {}, c)) return { ignoreOrigin: !0 };
                  },
                },
              },
            })], c.prototype, 'maxScale', null);
            b([e.reader('portal-item', 'maxScale', ['maxScale', 'layerDefinition.maxScale'])], c.prototype, 'readMaxScale', null);
            b([e.writer('maxScale')], c.prototype, 'writeMaxScale', null);
            b([e.property({
              type: Number,
              json: { write: { target: 'layerDefinition.drawingInfo.transparency' } },
            })], c.prototype, 'opacity', null);
            b([e.reader('opacity', ['layerDefinition.drawingInfo.transparency',
              'layerDefinition.transparency'])], c.prototype, 'readOpacity', null);
            b([e.writer('opacity')], c.prototype, 'writeOpacity', null);
            b([e.property({
              json: {
                type: Number,
                write: { target: 'parentLayerId', allowNull: !0 },
              },
            })], c.prototype, 'parent', void 0);
            b([e.writer('parent')], c.prototype, 'writeParent', null);
            b([e.property(n.popupEnabled)], c.prototype, 'popupEnabled', null);
            b([e.property({
              value: null,
              type: k,
              json: { read: { source: 'popupInfo' }, write: { target: 'popupInfo' } },
            })], c.prototype, 'popupTemplate', null);
            b([e.property({
              types: m.rendererTypes,
              value: null, json: { write: { target: 'layerDefinition.drawingInfo.renderer' } },
            })], c.prototype, 'renderer', null);
            b([e.reader('renderer', ['layerDefinition.drawingInfo.renderer'])], c.prototype, 'readRenderer', null);
            b([e.writer('renderer')], c.prototype, 'writeRenderer', null);
            b([e.writer('web-scene', 'renderer', { 'layerDefinition.drawingInfo.renderer': { types: m.webSceneRendererTypes } })], c.prototype, 'writeWebSceneRenderer', null);
            b([e.property({
              cast: q.castSource, json: {
                read: { source: 'layerDefinition.source', reader: q.sourceFromJSON },
                write: { target: 'layerDefinition.source' },
              },
            })], c.prototype, 'source', null);
            b([e.writer('source')], c.prototype, 'writeSource', null);
            b([e.property({
              value: null,
              json: { type: [D.Integer], write: { target: 'subLayerIds', allowNull: !0 } },
            })], c.prototype, 'sublayers', null);
            b([e.cast('sublayers')], c.prototype, 'castSublayers', null);
            b([e.writer('sublayers')], c.prototype, 'writeSublayers', null);
            b([e.property({
                type: String,
                value: null,
                json: { read: { source: 'name' }, write: { target: 'name', allowNull: !0, ignoreOrigin: !0 } },
              })], c.prototype,
              'title', null);
            b([e.writer('title')], c.prototype, 'writeTitle', null);
            b([e.property({
              type: String,
              dependsOn: ['layer', 'source'],
              json: {
                read: { source: 'layerUrl' }, write: {
                  target: 'layerUrl', overridePolicy: function() {
                    return { enabled: this._isOverridden('url') };
                  },
                },
              },
            })], c.prototype, 'url', null);
            b([e.property({
              type: Boolean,
              value: !0,
              json: { read: { source: 'defaultVisibility' }, write: { target: 'defaultVisibility' } },
            })], c.prototype, 'visible', null);
            b([e.writer('visible')], c.prototype, 'writeVisible', null);
            return c = z = b([e.subclass('esri.layers.support.Sublayer')],
              c);
          }(e.declared(g.JSONSupport));
        });
    }, 'esri/layers/support/sublayerUtils': function() {
      define(['require', 'exports', 'esri/layers/support/layerSourceUtils'], function(r, l, p) {
        function b(a, b) {
          function f(a) {
            var b = a.sublayers;
            k.unshift(a.id);
            b && b.toArray().forEach(f);
          }

          if (!a || !a.length) return !0;
          var k = [];
          b.forEach(f);
          if (a.length > k.length) return !1;
          b = 0;
          for (var m = k.length, l = 0; l < a.length; l++) {
            for (var h = a[l].id; b < m && k[b] !== h;) b++;
            if (b >= m) return !1;
          }
          return !0;
        }

        Object.defineProperty(l, '__esModule', { value: !0 });
        l.isExportDynamic = function(a, l,
                                     f) {
          return a.some(function(a) {
            var b = a.source;
            return !(!b || b.type === p.MAPLAYER && b.mapLayerId === a.id && (!b.gdbVersion || b.gdbVersion === f.gdbVersion)) || null != a.renderer || null != a.labelingInfo || a.hasOwnProperty('opacity') && null != a.opacity || a.hasOwnProperty('labelsVisible') && null != a.labelsVisible;
          }) ? !0 : !b(a, l);
        };
        l.sameStructureAsService = function(a, b) {
          return b.slice().reverse().flatten(function(a) {
            return (a = a.sublayers) && a.toArray().reverse();
          }).every(function(b, k) {
            return (k = a[k]) && b.id === k.id && (null == b.sublayers &&
              null == k.sublayers || null != b.sublayers && null != k.sublayers && b.sublayers.map(function(a) {
                return a.id;
              }).join(',') === k.sublayers.map(function(a) {
                return a.id;
              }).join(','));
          });
        };
      });
    }, 'esri/layers/support/ExportImageParameters': function() {
      define('require exports esri/core/tsSupport/assignHelper esri/core/tsSupport/declareExtendsHelper esri/core/tsSupport/decorateHelper esri/core/Accessor esri/core/accessorSupport/decorators esri/layers/support/sublayerUtils esri/layers/support/timeUtils esri/views/View'.split(' '), function(r, l, p, b, a, u, f, k, m, w) {
        Object.defineProperty(l, '__esModule', { value: !0 });
        var h = {
          visible: 'visibleSublayers',
          definitionExpression: 'layerDefs',
          labelingInfo: 'hasDynamicLayers',
          labelsVisible: 'hasDynamicLayers',
          opacity: 'hasDynamicLayers',
          minScale: 'visibleSublayers',
          maxScale: 'visibleSublayers',
          renderer: 'hasDynamicLayers',
          source: 'hasDynamicLayers',
        };
        r = function(l) {
          function g() {
            var a = null !== l && l.apply(this, arguments) || this;
            a._scale = null;
            a.view = null;
            return a;
          }

          b(g, l);
          Object.defineProperty(g.prototype, 'dynamicLayers', {
            get: function() {
              if (!this.hasDynamicLayers) return null;
              var a = this.visibleSublayers.map(function(a) {
                return a.toExportImageJSON();
              });
              return a.length ? JSON.stringify(a) : null;
            }, enumerable: !0, configurable: !0,
          });
          Object.defineProperty(g.prototype, 'hasDynamicLayers', {
            get: function() {
              return this.layer && k.isExportDynamic(this.visibleSublayers, this.layer.serviceSublayers, this.layer);
            }, enumerable: !0, configurable: !0,
          });
          Object.defineProperty(g.prototype, 'layer', {
            set: function(a) {
              var b = this;
              this._get('layer') !== a && (this._set('layer', a), this._layerHandles && (this._layerHandles.forEach(function(a) {
                return a.remove();
              }),
                this._layerHandles.length = 0), a && (this._layerHandles = [a.allSublayers.on('change', function() {
                return b.notifyChange('visibleSublayers');
              }), a.on('sublayer-update', function(a) {
                return b.notifyChange(h[a.propertyName]);
              })]));
            }, enumerable: !0, configurable: !0,
          });
          Object.defineProperty(g.prototype, 'layers', {
            get: function() {
              var a = this.visibleSublayers;
              return a ? a.length ? 'show:' + a.map(function(a) {
                return a.id;
              }).join(',') : 'show:-1' : null;
            }, enumerable: !0, configurable: !0,
          });
          Object.defineProperty(g.prototype, 'layerDefs', {
            get: function() {
              var a =
                this.visibleSublayers.filter(function(a) {
                  return null != a.definitionExpression;
                });
              return a.length ? JSON.stringify(a.reduce(function(a, b) {
                a[b.id] = b.definitionExpression;
                return a;
              }, {})) : null;
            }, enumerable: !0, configurable: !0,
          });
          Object.defineProperty(g.prototype, 'scale', {
            get: function() {
              return null != this._scale ? this._scale : this.view && this.view.scale || 0;
            }, set: function(a) {
              this.view || (this._scale = a, this.notifyChange('scale'));
            }, enumerable: !0, configurable: !0,
          });
          Object.defineProperty(g.prototype, 'version', {
            get: function() {
              this.layers;
              this.layerDefs;
              this.dynamicLayers;
              this.timeExtent;
              var a = this.layer;
              a && (a.dpi, a.imageFormat, a.imageTransparency, a.gdbVersion);
              return (this._get('version') || 0) + 1;
            }, set: function(a) {
              this._set('version', a);
            }, enumerable: !0, configurable: !0,
          });
          Object.defineProperty(g.prototype, 'visibleSublayers', {
            get: function() {
              var a = this, b = [];
              if (!this.layer) return b;
              var f = this.layer.sublayers, g = function(d) {
                var e = a.scale, f = 0 === d.minScale || e <= d.minScale,
                  k = 0 === d.maxScale || e >= d.maxScale;
                d.visible && (0 === e || f && k) && (d.sublayers ? d.sublayers.forEach(g) :
                  b.unshift(d));
              };
              f && f.forEach(g);
              f = this._get('visibleSublayers');
              return !f || f.length !== b.length || f.some(function(a, d) {
                return b[d] !== a;
              }) ? b : f;
            }, enumerable: !0, configurable: !0,
          });
          g.prototype.toJSON = function() {
            var a = this.layer, a = {
              dpi: a.dpi,
              format: a.imageFormat,
              transparent: a.imageTransparency,
              gdbVersion: a.gdbVersion || null,
            };
            this.hasDynamicLayers && this.dynamicLayers ? a.dynamicLayers = this.dynamicLayers : a = p({}, a, {
              layers: this.layers,
              layerDefs: this.layerDefs,
            });
            return a;
          };
          a([f.property({
            readOnly: !0, dependsOn: ['hasDynamicLayers',
              'visibleSublayers'],
          })], g.prototype, 'dynamicLayers', null);
          a([f.property({
            readOnly: !0,
            dependsOn: ['visibleSublayers', 'layer.serviceSublayers', 'layer.capabilities'],
          })], g.prototype, 'hasDynamicLayers', null);
          a([f.property()], g.prototype, 'layer', null);
          a([f.property({ readOnly: !0, dependsOn: ['visibleSublayers'] })], g.prototype, 'layers', null);
          a([f.property({ readOnly: !0, dependsOn: ['visibleSublayers'] })], g.prototype, 'layerDefs', null);
          a([f.property({ type: Number, dependsOn: ['view.scale'] })], g.prototype, 'scale', null);
          a([f.property(m.combinedViewLayerTimeExtentProperty)], g.prototype, 'timeExtent', void 0);
          a([f.property({ dependsOn: 'layers layerDefs dynamicLayers layer.dpi layer.imageFormat layer.imageTransparency layer.gdbVersion timeExtent'.split(' ') })], g.prototype, 'version', null);
          a([f.property({ type: w })], g.prototype, 'view', void 0);
          a([f.property({
            readOnly: !0,
            dependsOn: ['layer.sublayers', 'scale'],
          })], g.prototype, 'visibleSublayers', null);
          return g = a([f.subclass('esri.layers.mixins.ExportImageParameters')], g);
        }(f.declared(u));
        l.ExportImageParameters = r;
      });
    }, '*noref': 1,
  },
});

/**
 * 构造时要示填写属性有url，spatialRefrence，extent，units
 */
define('require exports esri/core/tsSupport/assignHelper esri/core/tsSupport/declareExtendsHelper esri/core/tsSupport/decorateHelper esri/core/tsSupport/paramHelper esri/core/tsSupport/generatorHelper esri/core/tsSupport/awaiterHelper esri/request esri/core/Error esri/core/maybe esri/core/MultiOriginJSONSupport esri/core/promiseUtils esri/core/accessorSupport/decorators esri/geometry/Extent esri/geometry/support/scaleUtils esri/layers/Layer esri/layers/mixins/ArcGISMapService esri/layers/mixins/ArcGISService esri/layers/mixins/OperationalLayer esri/layers/mixins/PortalLayer esri/layers/mixins/RefreshableLayer esri/layers/mixins/ScaleRangeLayer esri/layers/mixins/SublayersOwner esri/layers/mixins/TemporalLayer esri/layers/support/commonProperties esri/layers/support/ExportImageParameters esri/geometry/support/webMercatorUtils'.split(' '),
  function(r, l, p, b, a, u, f, k, m, w, h, A, g, d, x, v, y, e, D, E, n, F, q, G, t, B, H, webMercatorUtils) {
    return function(e) {
      function c(a, b) {
        a = e.call(this) || this;
        a.alwaysRefetch = !1;
        a.dpi = 96;
        a.gdbVersion = null;
        a.imageFormat = 'png24';
        a.imageMaxHeight = 2048;
        a.imageMaxWidth = 2048;
        a.imageTransparency = !0;
        a.labelsVisible = !1;
        a.isReference = null;
        a.operationalLayerType = 'ArcGISMapServiceLayer';
        a.sourceJSON = null;
        a.sublayers = null;
        a.type = 'map-image';
        a.url = null;
        a.pictureExtent = null;
        a.units = 'esriMeters';
        a.debounce = 200;
        a.multiple = 100;
        a.canvas = document.createElement('canvas');
        a.canvasContext = a.canvas.getContext('2d');
        a._timer = 0;
        a._lastImage = null;
        a._lastImageUTag = null;
        a._picture = null;
        return a;
      }

      b(c, e);
      c.prototype.normalizeCtorArgs = function(a, b) {
        return 'string' === typeof a ? p({ url: a }, b) : a;
      };
      c.prototype.load =
        function(a) {
          let pl = this;
          this.sourceJSON = this._setupSourceJSON(this.spatialReference, this.pictureExtent, this.units);
          let temp = new Image();
          temp.crossOrigin = 'Anonymous';
          temp.alt = 'map-picture';
          temp.src = this.url;
          temp.onload = function(ev) {
            pl._picture = temp;
          };
          var b = this, c = h.isSome(a) ? a.signal : null;
          this.addResolvingPromise(this.loadFromPortal({ supportedTypes: ['Map Service'] }, a).then(function() {
            return b._fetchService(c);
          }));
          return this.when();
        };
      c.prototype.readImageFormat = function(a, b) {
        return (a = b.supportedImageFormatTypes) && -1 < a.indexOf('PNG32') ? 'png32' : 'png24';
      };
      c.prototype.createExportImageParameters = function(a, b, c, d) {
        var e = d && d.pixelRatio || 1;
        a && 10 <= this.version && (a = a.clone().shiftCentralMeridian());
        var f = new H.ExportImageParameters({
          layer: this,
          scale: v.getScale({ extent: a, width: b }) * e,
        }), g = f.toJSON();
        f.layer = null;
        f.destroy();
        var f = !d || !d.rotation || 10.3 > this.version ? {} : { rotation: -d.rotation },
          k = a && a.spatialReference, k = k.wkid || JSON.stringify(k.toJSON());
        g.dpi *= e;
        e = {};
        if (d && d.timeExtent) {
          var h = d.timeExtent.toJSON();
          d = h.start;
          h = h.end;
          if (d && h && d === h) e.time = '' + d; else if (null != d || null != h) e.time = (null == d ? 'null' : d) + ',' + (null == h ? 'null' : h);
        }
        return p({
          bbox: a && a.xmin + ',' + a.ymin + ',' + a.xmax + ',' + a.ymax,
          bboxSR: k,
          imageSR: k,
          size: b + ',' + c,
        }, g, f, e);
      };
      c.prototype._generateImageUTag = function(a, b, c) {
        let width = b;
        let height = c;
        let left = Math.ceil(a.xmin / this.multiple) * this.multiple;
        let right = Math.ceil(a.xmax / this.multiple) * this.multiple;
        let top = Math.ceil(a.ymax / this.multiple) * this.multiple;
        let button = Math.ceil(a.ymin / this.multiple) * this.multiple;
        return `${width}_${height}_${left}_${right}_${top}_${button}`;
      };
      c.prototype.draw = function(ctx, picture, width, height, mapBox, pictureBox) {
        let crossBox = this.crossRect(mapBox, pictureBox);
        let mapDx = width / (mapBox[2] - mapBox[0]);
        let mapDy = height / (mapBox[3] - mapBox[1]);

        let mapLeft = Math.ceil(mapDx * (crossBox[0] - mapBox[0]));
        let mapRight = Math.ceil(mapDx * (crossBox[2] - mapBox[0]));
        let mapTop = Math.ceil(mapDy * (mapBox[3] - crossBox[3]));
        let mapBottom = Math.ceil(mapDy * (mapBox[3] - crossBox[1]));

        let imgWidth = picture.width;
        let imgHeight = picture.height;
        let imgDx = imgWidth / (pictureBox[2] - pictureBox[0]);
        let imgDy = imgHeight / (pictureBox[3] - pictureBox[1]);

        let imgLeft = Math.ceil(imgDx * (crossBox[0] - pictureBox[0]));
        let imgRight = Math.ceil(imgDx * (crossBox[2] - pictureBox[0]));
        let imgTop = Math.ceil(imgDy * (pictureBox[3] - crossBox[3]));
        let imgBottom = Math.ceil(imgDy * (pictureBox[3] - crossBox[1]));
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(picture, imgLeft, imgTop, imgRight - imgLeft, imgBottom - imgTop, mapLeft, mapTop, mapRight - mapLeft, mapBottom - mapTop);
        return ctx;
      };
      c.prototype.fetchImage = function(a, b, c, d) {
        let start = new Date().getTime();
        let imageUTag = this._generateImageUTag(a, b, c);
        let bbox = a;
        let width = b;
        let height = c;

        /**
         * 做防抖节流处理，
         * 此处不处理会导致界面卡顿
         */
        if (d.pixelRatio != 1 || start - this._timer < this.debounce) {
          return;
        } else {
          this._timer = start;
        }

        return new Promise(((resolve, reject) => {
          let data = new Image();
          data.crossOrigin = 'anonymous';
          data.alt = 'map-picture';

          if (imageUTag === this._lastImageUTag) {
            data.src = this._lastImage;
            resolve(data);
          } else {
            let overlayCanvas = this.canvas;
            let ctx = this.canvasContext;
            overlayCanvas.width = width;
            overlayCanvas.height = height;
            let mapBox, pictureBox;
            mapBox = [bbox.xmin, bbox.ymin, bbox.xmax, bbox.ymax];
            pictureBox = [this.pictureExtent.xmin, this.pictureExtent.ymin, this.pictureExtent.xmax, this.pictureExtent.ymax];

            if (this.isRectCross(mapBox, pictureBox)) {
              if (this._picture) {
                ctx = this.draw(ctx, this._picture, width, height, mapBox, pictureBox);
                data.src = overlayCanvas.toDataURL('image/png');
                resolve(data);
              } else {
                let pl = this;
                let temp = new Image();
                temp.crossOrigin = 'Anonymous';
                temp.alt = 'map-picture';
                temp.src = this.url;
                temp.onload = function(ev) {
                  pl._picture = temp;
                  ctx = pl.draw(ctx, pl._picture, width, height, mapBox, pictureBox);
                  data.src = overlayCanvas.toDataURL('image/png');
                  resolve(data);
                };
              }
            } else {
              ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
              data.src = overlayCanvas.toDataURL('image/png');
              resolve(data);
            }
          }
        })).then(data => {
          this._lastImage = data.src;
          this._lastImageUTag = imageUTag;
          return data;
        }).catch(error => {
          throw new w('PictureLayer:image-fetch-error', 'Unable to load image: ' + f, { error: error });
        });
      };

      c.prototype.isRectCross = function(a, c) {
        return (a[0] > c[2] || a[2] < c[0] || a[1] > c[3] || a[3] < c[1]) ?
          false :
          true;
      };

      c.prototype.crossRect = function(a, c) {
        let left = Math.max(a[0], c[0]);
        let right = Math.min(a[2], c[2]);
        let top = Math.min(a[3], c[3]);
        let bottom = Math.max(a[1], c[1]);
        return [left, bottom, right, top];
      };

      c.prototype._setupSourceJSON = function(spatialReference, extent, units) {
        let json = {
          currentVersion: '10.7',
          serviceDescription: '',
          mapName: 'Layers',
          description: '',
          copyrightText: '',
          supportsDynamicLayers: true,
          singleFusedMapCache: false,
          minScale: 0,
          maxScale: '0',
          units: units,
          supportedImageFormatTypes: 'PNG32,PNG24,PNG,JPG',
          capabilities: 'Map',
          supportedQueryFormats: 'JSON, AMF, geoJSON',
          exportTilesAllowed: false,
          supportsDatumTransformation: true,
          maxRecordCount: 1000,
          maxImageHeight: 4096,
          maxImageWidth: 4096,
          supportedExtensions: 'KmlServer',
          layers: [
            {
              id: 0,
              name: '' + (new Date()).valueOf() + '',
              parentLayerId: -1,
              subLayerIds: [],
              minScale: 0,
              maxScale: 0,
              type: 'Raster Layer',
            },
          ],
          tables: [],
          spatialReference: spatialReference,
          initialExtent: extent,
          fullExtent: extent,
          documentInfo: {
            Title: '',
            Author: '',
            Comments: '',
            Subject: '',
            Category: '',
            AntialiasingMode: 'None',
            TextAntialiasingMode: 'Force',
            Keywords: '',
          },
          datumTransformations: null,
        };
        return json;
      };

      c.prototype.getImageUrl = function(a, b, c, d) {
        return null;
      };

      c.prototype.importLayerViewModule = function(a) {
        return k(this, void 0,
          void 0, function() {
            return f(this, function(b) {
              switch (a.type) {
                case '2d':
                  return [2, g.create(function(a) {
                    return r(['esri/views/2d/layers/MapImageLayerView2D'], a);
                  })];
                case '3d':
                  return [2, g.create(function(a) {
                    return r(['esri/views/3d/layers/MapImageLayerView3D'], a);
                  })];
              }
              return [2];
            });
          });
      };

      c.prototype._fetchService = function(a) {
        return k(this, void 0, void 0, function() {
          let b, c, d;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                var res = this.sourceJSON ? (this.read(this.sourceJSON, {
                  origin: 'service',
                  url: this.parsedUrl,
                }), [2]) : [4,
                  m(this.parsedUrl.path, { query: p({ f: 'json' }, this.parsedUrl.query), signal: a })];
                return res;
              case 1:
                b = e.sent();
                c = b.data;
                if (d = b.ssl) this.url = this.url.replace(/^http:/i, 'https:');
                this.sourceJSON = c;
                this.read(c, { origin: 'service', url: this.parsedUrl });
                return [2];
              default:
                  return [2];
            }
          });
        });
      };
      a([d.property()], c.prototype, 'alwaysRefetch', void 0);
      a([d.property()], c.prototype, 'dpi', void 0);
      a([d.property()], c.prototype, 'gdbVersion', void 0);
      a([d.property({ json: { read: !1, write: !1 } })], c.prototype, 'popupEnabled', void 0);
      a([d.property()], c.prototype, 'imageFormat',
        void 0);
      a([d.reader('imageFormat', ['supportedImageFormatTypes'])], c.prototype, 'readImageFormat', null);
      a([d.property({ json: { origins: { service: { read: { source: 'maxImageHeight' } } } } })], c.prototype, 'imageMaxHeight', void 0);
      a([d.property({ json: { origins: { service: { read: { source: 'maxImageWidth' } } } } })], c.prototype, 'imageMaxWidth', void 0);
      a([d.property()], c.prototype, 'imageTransparency', void 0);
      a([d.property({ json: { read: !1, write: !1 } })], c.prototype, 'labelsVisible', void 0);
      a([d.property({
        type: Boolean, json: {
          read: !1,
          write: {
            enabled: !0, overridePolicy: function() {
              return { enabled: !1 };
            },
          },
        },
      })], c.prototype, 'isReference', void 0);
      a([d.property({ type: ['ArcGISMapServiceLayer'] })], c.prototype, 'operationalLayerType', void 0);
      a([d.property()], c.prototype, 'sourceJSON', void 0);
      a([d.property()], c.prototype, 'sublayers', void 0);
      a([d.property({ type: ['show', 'hide', 'hide-children'] })], c.prototype, 'listMode', void 0);
      a([d.property({ json: { read: !1 }, readOnly: !0, value: 'map-image' })], c.prototype, 'type', void 0);
      a([d.property(B.url)], c.prototype,
        'url', void 0);
      a([u(0, d.cast(x))], c.prototype, 'getImageUrl', null);
      return c = a([d.subclass('esri.layers.PictureLayer')], c);
    }(d.declared(t.TemporalLayer(q.ScaleRangeLayer(F.RefreshableLayer(G.SublayersOwner(e.ArcGISMapService(D.ArcGISService(E.OperationalLayer(n.PortalLayer(A.MultiOriginJSONMixin(y)))))))))));
  });
